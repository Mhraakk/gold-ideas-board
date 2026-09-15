const BLOCK = /(ignore previous|system prompt|api[_-]?key|password|rm -rf)/i;

export function guardInput(raw: string): { ok: true; text: string } | { ok: false; reason: string } {
  const text = raw.trim().slice(0, 280);
  if (text.length < 2) return { ok: false, reason: "ورودی خیلی کوتاه است." };
  if (BLOCK.test(text)) return { ok: false, reason: "ورودی توسط گاردریل رد شد." };
  return { ok: true, text };
}
