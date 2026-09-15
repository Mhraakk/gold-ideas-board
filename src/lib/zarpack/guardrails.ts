import {
  OCCASIONS,
  PRODUCT_KINDS,
  type GenerateInput,
  type Occasion,
  type ProductKind,
} from "./types";

const BLOCK =
  /(ignore previous|system prompt|api[_-]?key|password|rm -rf|<script|javascript:)/i;

export function isOccasion(v: string): v is Occasion {
  return (OCCASIONS as string[]).includes(v);
}

export function isProductKind(v: string): v is ProductKind {
  return (PRODUCT_KINDS as string[]).includes(v);
}

export function guardNote(raw: string): { ok: true; text: string } | { ok: false; reason: string } {
  const text = raw.trim().slice(0, 280);
  if (text.length < 2) return { ok: false, reason: "نکته خیلی کوتاه است. حداقل دو نویسه بنویس." };
  if (BLOCK.test(text)) return { ok: false, reason: "ورودی توسط گاردریل رد شد." };
  return { ok: true, text };
}

export function guardGenerate(input: {
  occasion?: unknown;
  productKind?: unknown;
  note?: unknown;
}): { ok: true; value: GenerateInput } | { ok: false; reason: string } {
  if (typeof input.occasion !== "string" || !isOccasion(input.occasion)) {
    return { ok: false, reason: "مناسبت نامعتبر است." };
  }
  if (typeof input.productKind !== "string" || !isProductKind(input.productKind)) {
    return { ok: false, reason: "نوع قطعه نامعتبر است." };
  }
  if (input.occasion === "ingot" && input.productKind !== "ingot") {
    return { ok: false, reason: "برای شمش اماراتی فقط خود شمش انتخاب می‌شود." };
  }
  const note = typeof input.note === "string" ? input.note : "";
  const guarded = guardNote(note.length ? note : "بستهٔ یکتا برای همین مناسبت.");
  if (!guarded.ok) return guarded;
  return {
    ok: true,
    value: {
      occasion: input.occasion,
      productKind: input.productKind,
      note: guarded.text,
    },
  };
}
