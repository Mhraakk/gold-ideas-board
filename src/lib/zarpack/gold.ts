import { DISCLAIMER, type GoldQuote } from "./types";

let lastGood: { usdPerOunce: number; fetchedAt: string } | null = null;

export function ounceToMazanehHint(usdPerOunce: number): string {
  return `${usdPerOunce.toFixed(2)} دلار در هر اونس تروی. تبدیل به مظنهٔ بازار تهران به نرخ دلار آزاد و ضریب مثقال بستگی دارد و اینجا حساب نمی‌شود.`;
}

export async function fetchGold(): Promise<GoldQuote> {
  try {
    const res = await fetch("https://api.gold-api.com/price/XAU", {
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        ok: false,
        error: `منبع طلا پاسخ ${res.status} داد.`,
        lastGood,
        disclaimer: DISCLAIMER,
      };
    }
    const json: unknown = await res.json();
    const price =
      typeof json === "object" && json !== null && "price" in json
        ? Number((json as { price: unknown }).price)
        : NaN;
    if (!Number.isFinite(price) || price <= 0) {
      return {
        ok: false,
        error: "عدد قیمت معتبر نبود.",
        lastGood,
        disclaimer: DISCLAIMER,
      };
    }
    lastGood = { usdPerOunce: price, fetchedAt: new Date().toISOString() };
    return {
      ok: true,
      usdPerOunce: price,
      fetchedAt: lastGood.fetchedAt,
      source: "gold-api.com",
      mazanehHint: ounceToMazanehHint(price),
      disclaimer: DISCLAIMER,
    };
  } catch {
    return {
      ok: false,
      error: "ارتباط با منبع طلا برقرار نشد.",
      lastGood,
      disclaimer: DISCLAIMER,
    };
  }
}
