'use client';
import { v4 as uuidv4 } from "uuid";
import { Position, Creature, Treasure, Coin, PowerUp, Hazard } from "../redux/gameSlice";

// Constants
export const GAME_WIDTH = 500;
export const GAME_HEIGHT = 700;
export const SUB_WIDTH = 56;
export const SUB_HEIGHT = 36;
export const COIN_SIZE = 28;
export const TREASURE_SIZE = 36;
export const CREATURE_SIZE = 48;
export const POWERUP_SIZE = 32;
export const HAZARD_SIZE = 40;

export const CREATURES = [
  { color: "#3ba1c9", emoji: "🐟", speed: 1.5 },
  { color: "#c43b7a", emoji: "🦑", speed: 2 },
  { color: "#fcb900", emoji: "🐠", speed: 1.8 },
  { color: "#adadad", emoji: "🦀", speed: 1.2 },
  { color: "#4e4e4e", emoji: "🦈", speed: 2.5 },
  { color: "#4a148c", emoji: "🦑", speed: 2.2 },
  { color: "#b388ff", emoji: "🐙", speed: 1.7 }
];

export const TREASURES = [
  { color: "#FFD700", emoji: "💰", value: 5 },
  { color: "#C0C0C0", emoji: "🔱", value: 8 },
  { color: "#b87333", emoji: "🪙", value: 10 }
];

export const POWER_UPS = [
  { type: "speed", emoji: "⚡" },
  { type: "shield", emoji: "🛡️" },
  { type: "magnet", emoji: "🧲" }
] as const;

export const HAZARDS = [
  { type: "whirlpool", emoji: "🌀" },
  { type: "mine", emoji: "💣" }
] as const;

export function getRandomPos(itemSize: number, yOffset = 0, yRange = GAME_HEIGHT): Position {
  return {
    x: Math.random() * (GAME_WIDTH - itemSize),
    y: yOffset + Math.random() * (yRange - itemSize),
  };
}

export function getRandomCreature(yOffset = 0, yRange = GAME_HEIGHT): Creature {
  const c = CREATURES[Math.floor(Math.random() * CREATURES.length)];
  const pos = getRandomPos(CREATURE_SIZE, yOffset, yRange);
  return { ...pos, ...c, id: uuidv4() };
}

export function getRandomTreasure(yOffset = 0, yRange = GAME_HEIGHT): Treasure {
  const t = TREASURES[Math.floor(Math.random() * TREASURES.length)];
  const pos = getRandomPos(TREASURE_SIZE, yOffset, yRange);
  return { ...pos, ...t, id: uuidv4() };
}

export function getRandomCoin(yOffset = 0, yRange = GAME_HEIGHT): Coin {
  const pos = getRandomPos(COIN_SIZE, yOffset, yRange);
  return { ...pos, id: uuidv4() };
}

export function getRandomPowerUp(yOffset = 0, yRange = GAME_HEIGHT): PowerUp {
  const p = POWER_UPS[Math.floor(Math.random() * POWER_UPS.length)];
  const pos = getRandomPos(POWERUP_SIZE, yOffset, yRange);
  return { ...pos, ...p, id: uuidv4() };
}

export function getRandomHazard(yOffset = 0, yRange = GAME_HEIGHT): Hazard {
  const h = HAZARDS[Math.floor(Math.random() * HAZARDS.length)];
  const pos = getRandomPos(HAZARD_SIZE, yOffset, yRange);
  return { ...pos, ...h, id: uuidv4() };
}

export function checkCollision(obj1: Position, size1: number, obj2: Position, size2: number): boolean {
  return (
    obj1.x < obj2.x + size2 &&
    obj1.x + size1 > obj2.x &&
    obj1.y < obj2.y + size2 &&
    obj1.y + size1 > obj2.y
  );
}