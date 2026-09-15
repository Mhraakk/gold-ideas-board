import type { GoldQuote } from "@/lib/types";

let lastGood: { usdPerOunce: number; fetchedAt: string } | null = null;

export async function fetchGold(): Promise<GoldQuote> {
  try {
    const res = await fetch("https://api.gold-api.com/price/XAU", {
      cache: "no-store",
    });
    if (!res.ok) {
      return { ok: false, error: `منبع طلا ${res.status} داد.`, lastGood };
    }
    const json: unknown = await res.json();
    const price =
      typeof json === "object" && json !== null && "price" in json
        ? Number((json as { price: unknown }).price)
        : NaN;
    if (!Number.isFinite(price) || price <= 0) {
      return { ok: false, error: "عدد قیمت معتبر نبود.", lastGood };
    }
    lastGood = { usdPerOunce: price, fetchedAt: new Date().toISOString() };
    return { ok: true, usdPerOunce: price, fetchedAt: lastGood.fetchedAt, source: "gold-api.com" };
  } catch {
    return { ok: false, error: "ارتباط با منبع طلا برقرار نشد.", lastGood };
  }
}

export function ounceToMazanehHint(usdPerOunce: number): string {
  return `${usdPerOunce.toFixed(2)} دلار در هر اونس تروی. تبدیل به مظنهٔ بازار تهران به نرخ دلار و ضریب مثقال وابسته است و اینجا محاسبه نمی‌شود.`;
}
