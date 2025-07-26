import { COIN_SIZE } from '../../lib/GameHelpers';

interface CoinProps {
  x: number;
  y: number;
  collected?: boolean;
  id?: string;
  collectedId?: string|null;
}

export default function Coin({ x, y, collected, id, collectedId }: CoinProps) {
  return (
    <div
      className={`absolute rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 border-2 border-yellow-700 shadow-md flex items-center justify-center font-bold text-white text-shadow z-10
        ${collectedId === id ? "scale-[1.8] rotate-45 opacity-0" : "scale-100 opacity-100"}`}
      style={{
        left: x,
        top: y,
        width: COIN_SIZE,
        height: COIN_SIZE,
        transition: "transform 0.4s, opacity 0.4s",
      }}
    >
      $
    </div>
  );
}