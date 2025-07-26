interface OverlayProps {
  show: boolean;
  children: React.ReactNode;
  bg?: string;
}

export default function Overlay({ show, children, bg }: OverlayProps) {
  if (!show) return null;
  return (
    <div
      className={`absolute inset-0 w-full h-full ${bg || "bg-black bg-opacity-70"} z-40 flex flex-col justify-center items-center`}
    >
      {children}
    </div>
  );
}