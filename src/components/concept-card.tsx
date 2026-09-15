import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { OCCASION_LABEL, PRODUCT_LABEL, type Concept } from "@/lib/zarpack/types";
import { cn } from "@/lib/cn";

export function ConceptCard({
  concept,
  favored,
  onFav,
}: {
  concept: Concept;
  favored: boolean;
  onFav: (id: string) => void;
}) {
  return (
    <article className="group relative break-inside-avoid overflow-hidden hairline bg-panel shadow-card">
      <Link to="/concept/$id" params={{ id: concept.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-bg">
          <img
            src={concept.heroImage}
            alt={concept.shellName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            crossOrigin="anonymous"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
        </div>
        <div className="space-y-2 p-4">
          <p className="label-tech text-muted">
            {OCCASION_LABEL[concept.occasion]} · {PRODUCT_LABEL[concept.productKind]}
          </p>
          <h2 className="display text-xl text-fg">{concept.shellName}</h2>
          <p className="text-sm text-muted">{concept.lede}</p>
          <p className="text-xs text-muted">
            {concept.companionName} · {concept.ritualSeconds} ثانیه آیین
          </p>
        </div>
      </Link>
      <button
        type="button"
        aria-label={favored ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"}
        aria-pressed={favored}
        onClick={() => onFav(concept.id)}
        className={cn(
          "absolute top-3 left-3 inline-flex h-11 w-11 items-center justify-center rounded-[2px] hairline bg-bg/80",
          favored ? "text-accent" : "text-fg",
        )}
      >
        <Heart className="size-4" fill={favored ? "currentColor" : "none"} />
      </button>
    </article>
  );
}
