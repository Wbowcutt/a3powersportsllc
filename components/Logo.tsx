import Image from "next/image";

type LogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

const ASPECT = 1536 / 1024;

export default function Logo({
  className = "",
  size = 48,
  priority = false,
}: LogoProps) {
  const width = Math.round(size * ASPECT);

  return (
    <Image
      src="/logo.png"
      alt="A3 Powersports"
      width={width}
      height={size}
      priority={priority}
      className={`h-auto w-auto shrink-0 ${className}`}
      style={{ height: size, width: "auto" }}
    />
  );
}
