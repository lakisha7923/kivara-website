import Image from "next/image";

type KivaraLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
  variant?: "full" | "mark";
};

/**
 * Official Kivara logo only — do not replace with generic icons.
 * Artwork stays exactly as provided; this component only controls display size.
 */
export default function KivaraLogo({
  size = 48,
  className = "",
  priority = false,
}: KivaraLogoProps) {
  return (
    <Image
      src="/logo/kivara-logo.png"
      alt="Kivara Healthcare"
      width={size}
      height={size}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
