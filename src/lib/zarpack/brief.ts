import {
  DISCLAIMER,
  OCCASION_LABEL,
  PRODUCT_LABEL,
  type Concept,
} from "./types";

export function conceptToBrief(concept: Concept): string {
  const lines: string[] = [
    "زرپک — پروندهٔ بسته",
    "================",
    `شناسه: ${concept.id}`,
    `عنوان: ${concept.title}`,
    `مناسبت: ${OCCASION_LABEL[concept.occasion]}`,
    `قطعه: ${PRODUCT_LABEL[concept.productKind]} — ${concept.productName}`,
    `مخاطب: ${concept.audience}`,
    `پوسته: ${concept.shellName}`,
    `درون: ${concept.interiorName}`,
    `همراه: ${concept.companionName}`,
    `آیین گشودن: حدود ${concept.ritualSeconds} ثانیه`,
    `نکته: ${concept.note}`,
    "",
    concept.lede,
    "",
  ];
  for (const section of concept.sections) {
    lines.push(`## ${section.title}`);
    lines.push(section.body);
    lines.push("");
  }
  lines.push("## دیل‌چک");
  lines.push(`- ${concept.dealCheck.weighOnScale}`);
  lines.push(`- ${concept.dealCheck.karat}`);
  lines.push(`- ${concept.dealCheck.craftFeeSeparate}`);
  lines.push(`- ${concept.dealCheck.returnPolicy}`);
  lines.push(`- ${concept.dealCheck.notAdvice}`);
  lines.push("");
  lines.push(DISCLAIMER);
  lines.push("زرپک — ایدهٔ بسته، نه توصیهٔ خرید طلا.");
  return lines.join("\n");
}
