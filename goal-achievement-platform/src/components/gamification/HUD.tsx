import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function HUD() {
  const { score, depth, health, totalCoins } = useSelector((state: RootState) => state.game);
  return (
    <div className="mt-3 text-xl text-yellow-400 text-shadow-lg flex justify-center gap-5">
      <div>Score: <b>{score}</b></div>
      <div>Depth: <b>{Math.floor(depth)}</b>m</div>
      <div>Total Coins: <b>{totalCoins}</b></div>
      <div>Health: <b>{health}</b></div>
    </div>
  );
}