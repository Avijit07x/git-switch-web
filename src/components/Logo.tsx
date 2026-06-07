import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

// Single-responsibility: app logo. Uses the actual SVG shipped with the
// Tauri app (mirrored into /public/logo.svg) so the brand mark is
// pixel-identical across the site and the app icon.
export function Logo({ size = 28, className }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="Git Switch"
      width={size}
      height={size}
      priority
      className={className}
    />
  );
}
