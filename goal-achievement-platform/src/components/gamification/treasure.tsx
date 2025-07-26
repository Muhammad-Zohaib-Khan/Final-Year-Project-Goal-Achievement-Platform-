import { TREASURE_SIZE } from '../../lib/GameHelpers';

interface TreasureProps {
  x: number;
  y: number;
  emoji: string;
  color: string;
  id?: string;
  collectedId?: string|null;
}

export default function Treasure({ x, y, emoji, color, id, collectedId }: TreasureProps) {
  return (
    <div
      className={`absolute rounded-lg border-2 border-yellow-700 shadow-md flex items-center justify-center font-bold text-white text-shadow z-10
        ${collectedId === id ? "scale-[2.1] rotate-45 opacity-0" : "scale-100 opacity-100"}`}
      style={{
        left: x,
        top: y,
        width: TREASURE_SIZE,
        height: TREASURE_SIZE,
        background: color,
        transition: "transform 0.5s, opacity 0.5s",
      }}
    >
      {emoji}
    </div>
  );
}