import type { DealCheck } from "@/lib/zarpack/types";

export function DealCheckPanel({ check }: { check: DealCheck }) {
  const items = [
    { k: "وزن", v: check.weighOnScale },
    { k: "عیار", v: check.karat },
    { k: "اجرت", v: check.craftFeeSeparate },
    { k: "بازگشت", v: check.returnPolicy },
    { k: "هشدار", v: check.notAdvice },
  ];
  return (
    <aside className="hairline bg-panel p-5">
      <p className="label-tech text-accent">Deal check</p>
      <h2 className="display mt-2 text-2xl">دیل‌چک</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.k} className="border-t border-line pt-3">
            <p className="label-tech text-muted">{item.k}</p>
            <p className="mt-1 text-sm text-fg">{item.v}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
