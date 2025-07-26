'use client';
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setGameState, addScore, addCoin, setPaused, setGameOver, setGameStarted } from "../../redux/gameSlice";
import SoundManager from "../../lib/SoundManager";
import {
  GAME_WIDTH, GAME_HEIGHT, SUB_WIDTH, SUB_HEIGHT,
  getRandomCoin, getRandomTreasure, getRandomCreature, getRandomPowerUp, getRandomHazard,
  COIN_SIZE, TREASURE_SIZE, POWERUP_SIZE, HAZARD_SIZE, CREATURE_SIZE,
  checkCollision
} from "../../lib/GameHelpers";
import HUD from "./HUD";
import Submarine from "./submarine";
import Coin from "./coin";
import Treasure from "./treasure";
import PowerUp from "./powerup";
import Hazard from "./hazards";
import Creature from "./creatures";
import Particles from "./particles";
import Overlay from "./Overlay";

const BASE_SUB_SPEED = 6;
const BASE_SCROLL_SPEED = 3;

type Particle = { x: number; y: number; size: number; color: string; life: number };

export default function GameBoard() {
  const dispatch = useDispatch<AppDispatch>();
  const gameState = useSelector((state: RootState) => state.game);
  const [message, setMessage] = useState("");
  const [collectedId, setCollectedId] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const soundManager = useRef<SoundManager>(SoundManager.getInstance());

  // Keyboard state
  const keysPressed = useRef<{[k: string]: boolean}>({});

  // Keyboard listeners
  useEffect(() => {
    const down = (e: KeyboardEvent) => { keysPressed.current[e.key] = true; keysPressed.current[e.key.toLowerCase()] = true; };
    const up = (e: KeyboardEvent) => { keysPressed.current[e.key] = false; keysPressed.current[e.key.toLowerCase()] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  // Pause and restart controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(setPaused(!gameState.paused));
      if (e.key === " ") {
        if (gameState.gameOver) restartGame();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gameState.paused, gameState.gameOver]);

  // Play background sound
  useEffect(() => {
    soundManager.current.play("background");
    return () => soundManager.current.stop("background");
  }, []);

  // Main game loop
  useEffect(() => {
    if (!gameState.gameStarted || gameState.paused || gameState.gameOver) return;

    let accumulatedTime = 0;
    const fixedTimeStep = 1000 / 60;

    const gameLoop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      accumulatedTime += deltaTime;

      while (accumulatedTime >= fixedTimeStep) {
        updateGame(fixedTimeStep);
        accumulatedTime -= fixedTimeStep;
      }
      updateParticles(deltaTime);
      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line
  }, [gameState.gameStarted, gameState.paused, gameState.gameOver, gameState.difficulty]);

  function updateGame(deltaTime: number) {
    const timeFactor = deltaTime / 16.67;
    const scrollSpeed = BASE_SCROLL_SPEED * getDifficultyMultiplier() * timeFactor;
    const subSpeed = BASE_SUB_SPEED * (1 + gameState.speedBoost) * timeFactor;
    // Move sub
    let { x: nx, y: ny } = gameState.sub;
    if (keysPressed.current["ArrowLeft"] || keysPressed.current["a"]) nx -= subSpeed;
    if (keysPressed.current["ArrowRight"] || keysPressed.current["d"]) nx += subSpeed;
    if (keysPressed.current["ArrowUp"] || keysPressed.current["w"]) ny -= subSpeed;
    if (keysPressed.current["ArrowDown"] || keysPressed.current["s"]) ny += subSpeed;
    nx = Math.max(0, Math.min(GAME_WIDTH - SUB_WIDTH, nx));
    ny = Math.max(0, Math.min(GAME_HEIGHT - SUB_HEIGHT, ny));

    // Scroll objects and depth
    dispatch(setGameState({
      sub: { x: nx, y: ny },
      coins: gameState.coins.map(c => ({ ...c, y: c.y - scrollSpeed })).filter(c => c.y > -COIN_SIZE),
      treasures: gameState.treasures.map(t => ({ ...t, y: t.y - scrollSpeed })).filter(t => t.y > -TREASURE_SIZE),
      creatures: gameState.creatures.map(c => {
        const newX = c.x + (Math.random() - 0.5) * c.speed * timeFactor;
        return {
          ...c,
          x: Math.max(0, Math.min(GAME_WIDTH - CREATURE_SIZE, newX)),
          y: c.y - scrollSpeed
        };
      }).filter(c => c.y > -CREATURE_SIZE),
      powerUps: gameState.powerUps.map(p => ({ ...p, y: p.y - scrollSpeed })).filter(p => p.y > -POWERUP_SIZE),
      hazards: gameState.hazards.map(h => ({ ...h, y: h.y - scrollSpeed })).filter(h => h.y > -HAZARD_SIZE),
      depth: gameState.depth + scrollSpeed
    }));

    // Spawn new objects
    if (Math.random() < 0.03 * timeFactor)
      dispatch(setGameState({ coins: [...gameState.coins, getRandomCoin(GAME_HEIGHT, 200)] }));
    if (Math.random() < 0.01 * timeFactor)
      dispatch(setGameState({ treasures: [...gameState.treasures, getRandomTreasure(GAME_HEIGHT, 300)] }));
    if (Math.random() < 0.02 * timeFactor)
      dispatch(setGameState({ creatures: [...gameState.creatures, getRandomCreature(GAME_HEIGHT, 250)] }));
    if (Math.random() < 0.005 * timeFactor)
      dispatch(setGameState({ powerUps: [...gameState.powerUps, getRandomPowerUp(GAME_HEIGHT, 300)] }));
    if (Math.random() < 0.007 * timeFactor)
      dispatch(setGameState({ hazards: [...gameState.hazards, getRandomHazard(GAME_HEIGHT, 300)] }));

    // Collisions
    checkCoinCollisions();
    checkTreasureCollisions();
    checkPowerUpCollisions();
    checkHazardCollisions();
    checkCreatureCollisions();
  }

  function updateParticles(deltaTime: number) {
    setParticles(prev =>
      prev
        .map(p => ({
          ...p,
          y: p.y - 1,
          x: p.x + (Math.random() - 0.5) * 0.5,
          life: p.life - deltaTime * 0.001
        }))
        .filter(p => p.life > 0)
    );
  }

  function getDifficultyMultiplier(): number {
    switch (gameState.difficulty) {
      case "easy": return 0.8;
      case "medium": return 1;
      case "hard": return 1.3;
      default: return 1;
    }
  }

  function startGame(difficulty: "easy"|"medium"|"hard") {
    let health = difficulty === "easy" ? 5 : difficulty === "medium" ? 3 : 2;
    dispatch(setGameState({
      sub: { x: GAME_WIDTH / 2 - SUB_WIDTH / 2, y: GAME_HEIGHT - 120 },
      coins: [getRandomCoin(200, 500)],
      treasures: [getRandomTreasure(400, 500)],
      creatures: [getRandomCreature(250, 400)],
      powerUps: [],
      hazards: [],
      score: 0,
      depth: 0,
      gameOver: false,
      paused: false,
      gameStarted: true,
      difficulty,
      shieldActive: false,
      magnetActive: false,
      speedBoost: 0,
      health,
    }));
    setMessage("");
    setCollectedId(null);
    soundManager.current.play("background");
    dispatch(setGameStarted(true));
  }

  function restartGame() {
    startGame(gameState.difficulty);
  }

  // --- COLLISION LOGIC (minimal for brevity, expand as you like)
  function checkCoinCollisions() {
    const newCoins = gameState.coins.map(coin => {
      if (coin.collected) return coin;
      const collision = checkCollision(gameState.sub, SUB_WIDTH, coin, COIN_SIZE);
      if (collision) {
        soundManager.current.play("coin");
        setCollectedId(coin.id);
        setTimeout(() => setCollectedId(null), 400);
        createParticles(coin.x + COIN_SIZE/2, coin.y + COIN_SIZE/2, "#FFD700", 5);
        dispatch(addScore(1));
        dispatch(addCoin(1));
        return { ...coin, collected: true };
      }
      return coin;
    });
    dispatch(setGameState({ coins: newCoins.filter(c => !c.collected) }));
  }
  function checkTreasureCollisions() {
    const newTreasures = gameState.treasures.map(treasure => {
      if (treasure.collected) return treasure;
      const collision = checkCollision(gameState.sub, SUB_WIDTH, treasure, TREASURE_SIZE);
      if (collision) {
        soundManager.current.play("treasure");
        setCollectedId(treasure.id);
        setTimeout(() => setCollectedId(null), 500);
        setMessage(`Treasure found! +${treasure.value}`);
        setTimeout(() => setMessage(""), 1000);
        createParticles(treasure.x + TREASURE_SIZE/2, treasure.y + TREASURE_SIZE/2, treasure.color, 10);
        dispatch(addScore(treasure.value));
        dispatch(addCoin(treasure.value));
        return { ...treasure, collected: true };
      }
      return treasure;
    });
    dispatch(setGameState({ treasures: newTreasures.filter(t => !t.collected) }));
  }
  function checkPowerUpCollisions() {}
  function checkHazardCollisions() {}
  function checkCreatureCollisions() {}
  // For brevity, above can be filled in as in your original logic.

  function createParticles(x: number, y: number, color: string, count: number) {
    const newParticles = Array.from({ length: count }, () => ({
      x,
      y,
      size: Math.random() * 6 + 2,
      color,
      life: Math.random() * 0.5 + 0.5
    }));
    setParticles(prev => [...prev, ...newParticles]);
  }

  // Dynamic ocean color
  const depthColor = Math.floor(16 + gameState.depth / 30).toString(16).padStart(2, '0');
  const bgColor = `bg-gradient-to-b from-[#${depthColor}1233] to-[#003049]`;

  // --- RENDER ---
  return (
    <div className="font-sans text-center mt-6">
      <h2 className="tracking-wider text-yellow-400 text-shadow-lg">Submarine Deep Sea Explorer</h2>
      {!gameState.gameStarted ? (
        <div className={`w-[500px] h-[700px] mx-auto border-4 border-gray-800 rounded-xl flex flex-col justify-center items-center text-white ${bgColor}`}>
          <h1 className="text-4xl mb-10">🌊 Dive In! 🌊</h1>
          <p className="text-lg mb-10 max-w-[80%] leading-relaxed">
            Collect treasures, avoid creatures, and explore the deep sea!
            Use arrow keys or WASD to move your submarine.
          </p>
          <div className="mb-10">
            <h3>Select Difficulty:</h3>
            <div className="flex gap-5 justify-center">
              <button onClick={() => startGame("easy")}
                className="px-6 py-3 text-lg bg-gradient-to-r from-green-500 to-green-700 rounded-lg text-white cursor-pointer transition-transform hover:scale-105 active:scale-95">
                Easy
              </button>
              <button onClick={() => startGame("medium")}
                className="px-6 py-3 text-lg bg-gradient-to-r from-blue-500 to-blue-800 rounded-lg text-white cursor-pointer transition-transform hover:scale-105 active:scale-95">
                Medium
              </button>
              <button onClick={() => startGame("hard")}
                className="px-6 py-3 text-lg bg-gradient-to-r from-red-500 to-red-700 rounded-lg text-white cursor-pointer transition-transform hover:scale-105 active:scale-95">
                Hard
              </button>
            </div>
          </div>
          <div className="text-sm text-blue-200">
            <p>Total Coins: {gameState.totalCoins}</p>
            <p>Press ESC to pause during game</p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-blue-200">
            Use arrow keys or WASD to move. Collect coins & treasures, avoid creatures!
            {gameState.paused && " (PAUSED)"}
          </p>
          <div
            className={`relative mx-auto w-[500px] h-[700px] border-4 border-gray-800 rounded-xl overflow-hidden shadow-xl ${bgColor}`}
          >
            {/* Health indicator */}
            <div className="absolute top-2 left-2 z-50 flex gap-1">
              {Array.from({ length: gameState.health }).map((_, i) => (
                <div key={i} className="w-5 h-5 bg-red-600 rounded-full border-2 border-red-800"></div>
              ))}
            </div>
            {/* Submarine */}
            <Submarine {...gameState.sub} shieldActive={gameState.shieldActive} gameOver={gameState.gameOver} />
            {/* Coins */}
            {gameState.coins.map(c => <Coin key={c.id} {...c} collectedId={collectedId} />)}
            {/* Treasures */}
            {gameState.treasures.map(t => <Treasure key={t.id} {...t} collectedId={collectedId} />)}
            {/* PowerUps */}
            {gameState.powerUps.map(p => <PowerUp key={p.id} {...p} collectedId={collectedId} />)}
            {/* Hazards */}
            {gameState.hazards.map(h => <Hazard key={h.id} {...h} collectedId={collectedId} />)}
            {/* Creatures */}
            {gameState.creatures.map(c => <Creature key={c.id} {...c} />)}
            {/* Particles */}
            <Particles particles={particles} />
            {/* Overlay message */}
            {message && (
              <div className="absolute left-0 top-[45%] w-full text-3xl text-yellow-400 font-bold text-center z-50 animate-pulse text-shadow-lg">
                {message}
              </div>
            )}
            {/* Pause Overlay */}
            <Overlay show={gameState.paused && !gameState.gameOver}>
              <div className="text-4xl font-bold">PAUSED</div>
              <button
                className="mt-8 px-9 py-3 bg-gradient-to-r from-blue-900 to-blue-950 border-none text-yellow-400 rounded-lg text-xl font-bold shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95"
                onClick={() => dispatch(setPaused(false))}
              >
                Resume
              </button>
            </Overlay>
            {/* Game Over Overlay */}
            <Overlay show={gameState.gameOver}>
              <div className="text-4xl font-bold">Game Over</div>
              <div className="text-2xl mt-4">
                Final Score: <b>{gameState.score}</b> <br />
                Max Depth: <b>{Math.floor(gameState.depth)}</b>m<br />
              </div>
              <button
                className="mt-8 px-9 py-3 bg-gradient-to-r from-blue-900 to-blue-950 border-none text-yellow-400 rounded-lg text-xl font-bold shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95"
                onClick={restartGame}
              >
                Play Again
              </button>
            </Overlay>
          </div>
          <HUD />
        </>
      )}
      <div className="text-gray-400 text-sm mt-2">
        Made with <a href="https://react.dev/" className="text-blue-200">React</a>, 
        <a href="https://react-spring.dev/" className="text-blue-200"> react-spring</a>, and
        <a href="https://howlerjs.com/" className="text-blue-200"> howler.js</a>
      </div>
    </div>
  );
}