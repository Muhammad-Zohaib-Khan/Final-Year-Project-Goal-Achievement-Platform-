
interface SubmarineProps {
  x: number;
  y: number;
  shieldActive: boolean;
  gameOver: boolean;
}

export default function Submarine({ x, y, shieldActive, gameOver }: SubmarineProps) {
  return (
    <div
      className={`absolute w-[56px] h-[36px] rounded-t-xl rounded-b-2xl flex items-center z-20
        ${shieldActive ? "bg-gradient-to-r from-green-500 to-green-700"
                       : "bg-gradient-to-r from-yellow-400 to-yellow-500"}
        border-2 border-gray-800 shadow-md`}
      style={{
        left: x,
        top: y,
        opacity: gameOver ? 0.4 : 1,
        pointerEvents: "none",
      }}
    >
      <div className="ml-2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border border-gray-800 mt-1 shadow-md" />
      <div className="w-2 h-5 bg-gray-900 rounded-l-lg rounded-r-sm absolute -left-3 top-1" />
      <div className="w-2 h-4 bg-gray-800 rounded-t-sm absolute right-3 -top-3" />
    </div>
  );
}