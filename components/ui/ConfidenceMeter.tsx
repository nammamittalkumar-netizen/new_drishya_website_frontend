interface ConfidenceMeterProps {
  value: number; // 0-100
  showLabel?: boolean;
}

function toneFor(value: number) {
  if (value >= 85) return "var(--success)";
  if (value >= 70) return "var(--warning)";
  return "var(--muted)";
}

export function ConfidenceMeter({
  value,
  showLabel = true,
}: ConfidenceMeterProps) {
  const color = toneFor(value);
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--surface-tertiary)]"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="AI confidence"
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold tabular-nums text-[var(--foreground)]">
          {value}%
        </span>
      )}
    </div>
  );
}
