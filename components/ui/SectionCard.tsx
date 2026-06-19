import { Card } from "@heroui/react";
import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className = "",
  bodyClassName = "",
}: SectionCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-[var(--foreground)]">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-xs text-[var(--muted)]">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className={`p-5 ${bodyClassName}`}>{children}</div>
    </Card>
  );
}
