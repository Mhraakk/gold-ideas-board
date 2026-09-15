import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

function Bracket({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute h-3 w-3 border-fg/80", className)}
    />
  );
}

export function PageFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[1100px] px-5 py-8 md:px-10 md:py-16", className)}>
      <span className="pointer-events-none absolute top-0 bottom-0 right-3 w-px bg-line md:right-5" />
      <span className="pointer-events-none absolute top-0 bottom-0 left-3 w-px bg-line md:left-5" />
      <span className="pointer-events-none absolute top-8 right-2 h-1.5 w-1.5 bg-fg md:right-4" />
      <span className="pointer-events-none absolute top-8 left-2 h-1.5 w-1.5 bg-fg md:left-4" />
      <span className="pointer-events-none absolute bottom-8 right-2 h-1.5 w-1.5 bg-fg md:right-4" />
      <span className="pointer-events-none absolute bottom-8 left-2 h-1.5 w-1.5 bg-fg md:left-4" />
      <div className="relative hairline bg-bg/80 p-4 md:p-8">
        <Bracket className="top-0 right-0 border-t border-r" />
        <Bracket className="top-0 left-0 border-t border-l" />
        <Bracket className="bottom-0 right-0 border-b border-r" />
        <Bracket className="bottom-0 left-0 border-b border-l" />
        {children}
      </div>
    </div>
  );
}
