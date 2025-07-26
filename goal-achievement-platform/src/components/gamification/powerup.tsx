import { POWERUP_SIZE } from '../../lib/GameHelpers';

interface PowerUpProps {
  x: number;
  y: number;
  emoji: string;
  id?: string;
  collectedId?: string|null;
}

export default function PowerUp({ x, y, emoji, id, collectedId }: PowerUpProps) {
  return (
    <div
      className={`absolute rounded-full border-2 border-green-800 shadow-lg flex items-center justify-center z-10
        ${collectedId === id ? "scale-[2.5] rotate-45 opacity-0" : "scale-100 opacity-100"}`}
      style={{
        left: x,
        top: y,
        width: POWERUP_SIZE,
        height: POWERUP_SIZE,
        background: "radial-gradient(circle, #00FF00, #009900)",
        transition: "transform 0.6s, opacity 0.6s",
      }}
    >
      {emoji}
    </div>
  );
}