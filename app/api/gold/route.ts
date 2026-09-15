import { NextResponse } from "next/server";
import { fetchGold, ounceToMazanehHint } from "@/server/llm/gold";

export async function GET(): Promise<NextResponse> {
  const quote = await fetchGold();
  if (quote.ok) {
    return NextResponse.json({
      ...quote,
      mazanehHint: ounceToMazanehHint(quote.usdPerOunce),
      disclaimer: "این فقط اطلاعات است، نه توصیه‌ی مالی.",
    });
  }
  return NextResponse.json({
    ...quote,
    disclaimer: "این فقط اطلاعات است، نه توصیه‌ی مالی.",
  });
}
