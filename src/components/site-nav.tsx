import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/cn";

const LINKS = [
  { to: "/", label: "بورد" },
  { to: "/builder", label: "سازنده" },
  { to: "/pulse", label: "نبض" },
] as const;

export function SiteNav({ current }: { current: string }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <Link to="/" className="group block">
        <p className="label-tech text-muted">ZARPACK</p>
        <h1 className="display text-3xl text-fg md:text-4xl">زرپک</h1>
        <p className="mt-1 text-sm text-muted">طلای کارشده با بستهٔ یکتا</p>
      </Link>
      <nav className="flex flex-wrap gap-2" aria-label="اصلی">
        {LINKS.map((link) => {
          const active = current === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "inline-flex min-h-11 items-center rounded-[2px] px-4 text-sm",
                active ? "bg-fg text-bg" : "hairline text-fg hover:bg-fg/5",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
