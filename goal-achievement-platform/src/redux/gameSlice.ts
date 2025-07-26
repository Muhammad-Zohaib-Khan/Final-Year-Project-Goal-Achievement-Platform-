import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Position = { x: number; y: number };
export type GameObject = Position & { id: string; collected?: boolean };
export type Creature = GameObject & { color: string; emoji: string; speed: number };
export type Treasure = GameObject & { color: string; emoji: string; value: number };
export type Coin = GameObject;
export type PowerUp = GameObject & { type: "speed" | "shield" | "magnet"; emoji: string };
export type Hazard = GameObject & { type: "whirlpool" | "mine"; emoji: string };

export type GameState = {
  sub: Position;
  coins: Coin[];
  treasures: Treasure[];
  creatures: Creature[];
  powerUps: PowerUp[];
  hazards: Hazard[];
  score: number;
  depth: number;
  gameOver: boolean;
  paused: boolean;
  gameStarted: boolean;
  difficulty: "easy" | "medium" | "hard";
  shieldActive: boolean;
  magnetActive: boolean;
  speedBoost: number;
  health: number;
  totalCoins: number;
};

const DEFAULT_STATE = {
  sub: { x: 222, y: 580 },
  coins: [],
  treasures: [],
  creatures: [],
  powerUps: [],
  hazards: [],
  score: 0,
  depth: 0,
  gameOver: false,
  paused: false,
  gameStarted: false,
  difficulty: "medium" as GameState["difficulty"],
  shieldActive: false,
  magnetActive: false,
  speedBoost: 0,
  health: 3,
  totalCoins: 0,
};

const initialState: GameState = (() => {
  let totalCoins = 0;
  if (typeof window !== "undefined") {
    totalCoins = Number(localStorage.getItem("totalCoins") || "0");
  }
  return { ...DEFAULT_STATE, totalCoins };
})();

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState(state, action: PayloadAction<Partial<GameState>>) {
      Object.assign(state, action.payload);
    },
    addScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },
    addCoin(state, action: PayloadAction<number>) {
      state.totalCoins += action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("totalCoins", state.totalCoins.toString());
      }
    },
    resetGame(state, action: PayloadAction<GameState>) {
      Object.assign(state, action.payload);
    },
    setPaused(state, action: PayloadAction<boolean>) {
      state.paused = action.payload;
    },
    setGameOver(state, action: PayloadAction<boolean>) {
      state.gameOver = action.payload;
    },
    setGameStarted(state, action: PayloadAction<boolean>) {
      state.gameStarted = action.payload;
    }
  }
});

export const { setGameState, addScore, addCoin, resetGame, setPaused, setGameOver, setGameStarted } = gameSlice.actions;
export default gameSlice.reducer;