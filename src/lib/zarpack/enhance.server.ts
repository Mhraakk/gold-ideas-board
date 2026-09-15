import type { Concept } from "./types";

export async function enhanceConcept(concept: Concept): Promise<Concept> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return concept;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);
  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 400,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "تو نویسندهٔ پروندهٔ بستهٔ هدیهٔ طلای کارشده هستی. فقط JSON برگردان با کلیدهای lede و story. فارسی، کوتاه، ملموس. توصیهٔ مالی نده. قیمت نساز.",
          },
          {
            role: "user",
            content: JSON.stringify({
              title: concept.title,
              occasion: concept.occasion,
              product: concept.productName,
              shell: concept.shellName,
              interior: concept.interiorName,
              companion: concept.companionName,
              note: concept.note,
              lede: concept.lede,
            }),
          },
        ],
      }),
    });
    if (!res.ok) return concept;
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = body.choices?.[0]?.message?.content ?? "";
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    if (jsonStart < 0 || jsonEnd <= jsonStart) return concept;
    const parsed = JSON.parse(raw.slice(jsonStart, jsonEnd + 1)) as {
      lede?: unknown;
      story?: unknown;
    };
    const next: Concept = {
      ...concept,
      source: "model",
      sections: concept.sections.map((s) => ({ ...s })),
    };
    if (typeof parsed.lede === "string" && parsed.lede.trim()) {
      next.lede = parsed.lede.trim().slice(0, 280);
    }
    if (typeof parsed.story === "string" && parsed.story.trim()) {
      next.sections = next.sections.map((s) =>
        s.key === "story" ? { ...s, body: parsed.story!.toString().trim().slice(0, 800) } : s,
      );
    }
    return next;
  } catch {
    return concept;
  } finally {
    clearTimeout(timer);
  }
}
