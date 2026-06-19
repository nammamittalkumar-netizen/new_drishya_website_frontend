import { buttonVariants } from "@heroui/react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * A Next.js <Link> styled to look like a HeroUI Button (using the shared
 * `buttonVariants`). Use this instead of <Button> whenever you need to
 * navigate to another route.
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${buttonVariants({ variant, size, fullWidth })} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
