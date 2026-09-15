import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageFrame } from "@/components/page-frame";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { getGoldFn } from "@/lib/zarpack/server";
import { DISCLAIMER, FED_AT, type GoldQuote } from "@/lib/zarpack/types";

export const Route = createFileRoute("/pulse")({
  loader: () => getGoldFn(),
  component: PulsePage,
});

function formatRemain(ms: number): string {
  if (ms <= 0) return "اعلام شد";
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function PulsePage() {
  const initial = Route.useLoaderData();
  const [quote, setQuote] = useState<GoldQuote>(initial);
  const [busy, setBusy] = useState(false);
  const [remain, setRemain] = useState(() => new Date(FED_AT).getTime() - Date.now());

  useEffect(() => {
    const t = window.setInterval(() => {
      setRemain(new Date(FED_AT).getTime() - Date.now());
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  async function refresh() {
    setBusy(true);
    try {
      setQuote(await getGoldFn());
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageFrame>
      <SiteNav current="/pulse" />
      <section className="reveal space-y-4">
        <p className="label-tech text-muted">PULSE</p>
        <h2 className="display text-3xl md:text-5xl">نبض طلا</h2>
        <p className="max-w-xl text-muted">
          اونس از منبع زنده. مظنهٔ تهران اینجا حساب نمی‌شود چون نرخ دلار را جعل نمی‌کنیم.
        </p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="hairline bg-panel p-6">
          <p className="label-tech text-muted">XAU / USD</p>
          {quote.ok ? (
            <>
              <p className="display mt-3 font-mono text-5xl tabular-nums whitespace-nowrap">
                {quote.usdPerOunce.toFixed(2)}
              </p>
              <p className="mt-2 text-sm text-muted">{quote.mazanehHint}</p>
              <p className="mt-2 font-mono text-xs text-muted">
                {quote.source} · {new Date(quote.fetchedAt).toLocaleString("fa-IR")}
              </p>
            </>
          ) : (
            <>
              <p className="mt-3 text-accent">عدد زنده در دسترس نیست.</p>
              <p className="mt-2 text-sm text-muted">{quote.error}</p>
              {quote.lastGood ? (
                <p className="mt-2 text-sm text-muted">
                  آخرین عدد معتبر: {quote.lastGood.usdPerOunce.toFixed(2)} در{" "}
                  {new Date(quote.lastGood.fetchedAt).toLocaleString("fa-IR")}
                </p>
              ) : (
                <p className="mt-2 text-sm text-muted">عدد ساختگی نشان داده نمی‌شود.</p>
              )}
            </>
          )}
          <Button variant="ghost" className="mt-4" onClick={refresh} disabled={busy}>
            {busy ? "در حال خواندن منبع…" : "تازه‌سازی از منبع"}
          </Button>
        </article>

        <article className="hairline bg-panel p-6">
          <p className="label-tech text-muted">FED</p>
          <p className="display mt-3 font-mono text-4xl tabular-nums whitespace-nowrap">{formatRemain(remain)}</p>
          <p className="mt-2 text-sm text-muted">
            موعد {new Date(FED_AT).toLocaleString("fa-IR")} — بعد از آن متن «اعلام شد» می‌ماند.
          </p>
        </article>
      </div>

      <section className="mt-8 hairline bg-panel p-6">
        <p className="label-tech text-accent">مظنه</p>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          مظنه در بازار تهران معمولاً برای طلای ۱۸ عیار و بر حسب مثقال گفته می‌شود. اونس جهانی، نرخ دلار،
          و ضریب تبدیل مثقال سه ورودی جدا هستند. زرپک فقط اونس را از منبع می‌خواند. اجرت کار روی قطعهٔ
          کارشده جدا از مظنه است و باید دو خط روی فاکتور بیاید.
        </p>
        <p className="mt-4 text-sm text-fg">{DISCLAIMER}</p>
      </section>
    </PageFrame>
  );
}
