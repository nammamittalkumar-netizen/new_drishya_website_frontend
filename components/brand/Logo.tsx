import Image from "next/image";

interface LogoProps {
  /** Show the "Drishya" wordmark next to the mark. */
  showWordmark?: boolean;
  /** Show the company / tagline line under the wordmark. */
  showTagline?: boolean;
  size?: number;
  className?: string;
}

/**
 * Drishya lockup. The mark is theme-agnostic (gradient on transparent); the
 * wordmark uses the current foreground color so it adapts to light/dark.
 */
export function Logo({
  showWordmark = true,
  showTagline = false,
  size = 36,
  className = "",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/brand/drishya-mark.svg"
        alt="Drishya"
        width={size}
        height={size}
        priority
        className="shrink-0"
      />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className="font-extrabold tracking-tight text-[var(--foreground)]"
            style={{ fontSize: size * 0.62 }}
          >
            Drishya
          </span>
          {showTagline && (
            <span className="mt-1 text-[11px] font-medium text-[var(--muted)]">
              by Namma CCTV Private Limited
            </span>
          )}
        </span>
      )}
    </span>
  );
}
