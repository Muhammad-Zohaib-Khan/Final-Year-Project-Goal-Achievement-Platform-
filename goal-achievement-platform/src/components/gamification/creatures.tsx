import { CREATURE_SIZE } from '../../lib/GameHelpers';
interface CreatureProps {
  x: number;
  y: number;
  emoji: string;
  color: string;
  id?: string;
}

export default function Creature({ x, y, emoji, color }: CreatureProps) {
  return (
    <div
      className="absolute rounded-full border-2 border-gray-800 flex items-center justify-center z-10 opacity-90 shadow-lg"
      style={{
        left: x,
        top: y,
        width: CREATURE_SIZE,
        height: CREATURE_SIZE,
        background: color,
      }}
    >
      {emoji}
    </div>
  );
}