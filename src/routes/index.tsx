import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ConceptCard } from "@/components/concept-card";
import { PageFrame } from "@/components/page-frame";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { cacheMany, readFavs, toggleFav } from "@/lib/zarpack/favorites";
import { getBoard, waveConceptsFn } from "@/lib/zarpack/server";
import {
  OCCASION_LABEL,
  OCCASIONS,
  PRODUCT_KINDS,
  PRODUCT_LABEL,
  type Concept,
  type Occasion,
  type ProductKind,
} from "@/lib/zarpack/types";

export const Route = createFileRoute("/")({
  loader: () => getBoard(),
  component: BoardPage,
});

function BoardPage() {
  const seeded = Route.useLoaderData();
  const [extra, setExtra] = useState<Concept[]>([]);
  const [favs, setFavs] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [occasion, setOccasion] = useState<Occasion | "all">("all");
  const [kind, setKind] = useState<ProductKind | "all">("all");
  const [onlyFav, setOnlyFav] = useState(false);
  const [visible, setVisible] = useState(6);
  const [waveBusy, setWaveBusy] = useState(false);
  const [waveError, setWaveError] = useState<string | null>(null);

  useEffect(() => {
    setFavs(readFavs());
  }, []);

  const all = useMemo(() => {
    const map = new Map<string, Concept>();
    for (const c of [...seeded, ...extra]) map.set(c.id, c);
    return [...map.values()];
  }, [seeded, extra]);

  const filtered = all.filter((c) => {
    if (occasion !== "all" && c.occasion !== occasion) return false;
    if (kind !== "all" && c.productKind !== kind) return false;
    if (onlyFav && !favs.includes(c.id)) return false;
    if (!q.trim()) return true;
    const hay = `${c.title} ${c.lede} ${c.shellName} ${c.productName} ${c.note}`.toLowerCase();
    return hay.includes(q.trim().toLowerCase());
  });
  const shown = filtered.slice(0, visible);

  function onFav(id: string) {
    setFavs(toggleFav(id));
  }

  async function loadWave() {
    setWaveBusy(true);
    setWaveError(null);
    try {
      const wave = await waveConceptsFn();
      cacheMany(wave);
      setExtra((prev) => [...wave, ...prev]);
      setVisible((v) => v + 4);
    } catch {
      setWaveError("موج تازه ساخته نشد. دوباره بزن.");
    } finally {
      setWaveBusy(false);
    }
  }

  return (
    <PageFrame>
      <SiteNav current="/" />
      <section className="reveal mb-8 space-y-4">
        <p className="label-tech text-muted">COSMOS BOARD</p>
        <h2 className="display max-w-2xl text-3xl md:text-5xl">
          هر کارت یک بسته است، نه فقط یک قطعه طلا.
        </h2>
        <p className="max-w-xl text-muted">
          تولد، جشن، هدیه به میزبان، شمش اماراتی. پوسته، درون، همراه و آیین گشودن برای هر سفارش یکتاست.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/builder"
            className="inline-flex min-h-11 items-center rounded-[2px] bg-fg px-4 text-sm text-bg"
          >
            ساخت بسته
          </Link>
          <Button variant="ghost" onClick={loadWave} disabled={waveBusy}>
            {waveBusy ? "در حال چیدن موج…" : "موج تازه"}
          </Button>
        </div>
        {waveError ? <p className="text-sm text-accent">{waveError}</p> : null}
      </section>

      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجو در بسته، قطعه، مناسبت"
          className="min-h-11 w-full rounded-[2px] hairline bg-transparent px-3 text-sm text-fg placeholder:text-muted"
          aria-label="جستجو"
        />
        <label className="inline-flex min-h-11 items-center gap-2 px-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={onlyFav}
            onChange={(e) => setOnlyFav(e.target.checked)}
          />
          فقط علاقه‌مندی
        </label>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <FilterChip active={occasion === "all"} onClick={() => setOccasion("all")}>
          همه مناسبت‌ها
        </FilterChip>
        {OCCASIONS.map((o) => (
          <FilterChip key={o} active={occasion === o} onClick={() => setOccasion(o)}>
            {OCCASION_LABEL[o]}
          </FilterChip>
        ))}
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterChip active={kind === "all"} onClick={() => setKind("all")}>
          همه قطعه‌ها
        </FilterChip>
        {PRODUCT_KINDS.map((k) => (
          <FilterChip key={k} active={kind === k} onClick={() => setKind(k)}>
            {PRODUCT_LABEL[k]}
          </FilterChip>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="py-16 text-center text-muted">بسته‌ای با این فیلتر نیست. فیلتر را عوض کن یا موج تازه بگیر.</p>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {shown.map((c) => (
            <div key={c.id} className="mb-4">
              <ConceptCard concept={c} favored={favs.includes(c.id)} onFav={onFav} />
            </div>
          ))}
        </div>
      )}

      {visible < filtered.length ? (
        <div className="mt-8 flex justify-center">
          <Button variant="ghost" onClick={() => setVisible((v) => v + 4)}>
            بار بیشتر
          </Button>
        </div>
      ) : null}
    </PageFrame>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "min-h-11 rounded-[2px] bg-fg px-3 text-sm text-bg"
          : "min-h-11 rounded-[2px] hairline px-3 text-sm text-fg"
      }
    >
      {children}
    </button>
  );
}
