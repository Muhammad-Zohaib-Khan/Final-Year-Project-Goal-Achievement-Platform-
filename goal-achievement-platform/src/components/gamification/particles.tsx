// expects an array of { x, y, size, color, life }
export default function Particles({ particles }: { particles: { x: number, y: number, size: number, color: string, life: number }[] }) {
  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x - p.size/2,
            top: p.y - p.size/2,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.life,
            transform: `scale(${p.life})`,
            transition: "transform 0.1s, opacity 0.1s"
          }}
        />
      ))}
    </>
  );
}