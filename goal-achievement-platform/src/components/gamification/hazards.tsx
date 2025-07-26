import { HAZARD_SIZE } from '../../lib/GameHelpers';

interface HazardProps {
  x: number;
  y: number;
  emoji: string;
  type: string;
  id?: string;
  collectedId?: string|null;
}

export default function Hazard({ x, y, emoji, type, id, collectedId }: HazardProps) {
  return (
    <div
      className={`absolute border-2 border-red-800 shadow-lg flex items-center justify-center z-10
        ${type === "mine" ? "rounded-full" : "rounded-lg"}
        ${collectedId === id ? "scale-[2.5] opacity-0" : "scale-100 opacity-100"}`}
      style={{
        left: x,
        top: y,
        width: HAZARD_SIZE,
        height: HAZARD_SIZE,
        background: type === "mine"
          ? "radial-gradient(circle, #FF0000, #880000)"
          : "radial-gradient(circle, #FF8800, #884400)",
        transition: "transform 0.4s, opacity 0.4s",
      }}
    >
      {emoji}
    </div>
  );
}