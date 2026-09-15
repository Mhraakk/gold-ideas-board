import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageFrame } from "@/components/page-frame";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { cacheConcept } from "@/lib/zarpack/favorites";
import { generateConceptFn } from "@/lib/zarpack/server";
import {
  OCCASION_LABEL,
  OCCASIONS,
  PRODUCT_KINDS,
  PRODUCT_LABEL,
  type Occasion,
  type ProductKind,
} from "@/lib/zarpack/types";

export const Route = createFileRoute("/builder")({
  component: BuilderPage,
});

function BuilderPage() {
  const navigate = useNavigate();
  const [occasion, setOccasion] = useState<Occasion>("birthday");
  const [productKind, setProductKind] = useState<ProductKind>("necklace");
  const [note, setNote] = useState("غافلگیری آرام، جعبه روی میز بماند.");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const kinds =
    occasion === "ingot" ? (["ingot"] as ProductKind[]) : PRODUCT_KINDS.filter((k) => k !== "ingot");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const kind = occasion === "ingot" ? "ingot" : productKind;
      const concept = await generateConceptFn({
        data: { occasion, productKind: kind, note },
      });
      cacheConcept(concept);
      await navigate({ to: "/concept/$id", params: { id: concept.id } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "ساخت بسته ممکن نشد.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageFrame>
      <SiteNav current="/builder" />
      <div className="reveal grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={onSubmit} className="space-y-6">
          <p className="label-tech text-muted">PACKAGE BUILDER</p>
          <h2 className="display text-3xl md:text-5xl">بسته را از مناسبت بساز، نه از ویترین.</h2>
          <p className="text-muted">
            قطعه را انتخاب می‌کنی. پوسته، درون، همراه و آیین گشودن برای همین سفارش چیده می‌شود.
          </p>

          <fieldset className="space-y-2">
            <legend className="label-tech text-muted">مناسبت</legend>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => {
                    setOccasion(o);
                    if (o === "ingot") setProductKind("ingot");
                    else if (productKind === "ingot") setProductKind("necklace");
                  }}
                  className={
                    occasion === o
                      ? "min-h-11 rounded-[2px] bg-fg px-3 text-sm text-bg"
                      : "min-h-11 rounded-[2px] hairline px-3 text-sm"
                  }
                >
                  {OCCASION_LABEL[o]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="label-tech text-muted">قطعه</legend>
            <div className="flex flex-wrap gap-2">
              {kinds.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setProductKind(k)}
                  className={
                    productKind === k
                      ? "min-h-11 rounded-[2px] bg-fg px-3 text-sm text-bg"
                      : "min-h-11 rounded-[2px] hairline px-3 text-sm"
                  }
                >
                  {PRODUCT_LABEL[k]}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block space-y-2">
            <span className="label-tech text-muted">نکته برای این سفارش</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 280))}
              rows={4}
              className="w-full rounded-[2px] hairline bg-transparent p-3 text-sm text-fg"
              required
              minLength={2}
            />
            <span className="block text-xs text-muted">{note.length}/280</span>
          </label>

          {error ? <p className="text-sm text-accent">{error}</p> : null}

          <Button type="submit" disabled={busy}>
            {busy ? "در حال چیدن بسته…" : "ساخت پرونده"}
          </Button>
        </form>

        <aside className="hairline bg-panel p-5">
          <p className="label-tech text-accent">Guardrails</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>فرانت به مدل وصل نمی‌شود. کلید در مرورگر نیست.</li>
            <li>اگر مدل در دسترس باشد داستان فارسی بازنویسی می‌شود؛ وگرنه ارکستراتور قطعی کار می‌کند.</li>
            <li>شمش اماراتی فقط با خود شمش جفت می‌شود.</li>
            <li>دیل‌چک روی هر پرونده اجباری است. عدد طلای ساختگی نداریم.</li>
          </ul>
        </aside>
      </div>
    </PageFrame>
  );
}
