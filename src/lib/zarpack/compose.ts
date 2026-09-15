import {
  COMPANIONS,
  INTERIORS,
  PRODUCT_COPY,
  RITUALS,
  SHELLS,
  IMG,
  type CatalogItem,
} from "./catalogs";
import { fnv1a, hex8, pick } from "./hash";
import {
  DISCLAIMER,
  OCCASION_LABEL,
  PRODUCT_LABEL,
  SECTION_LABEL,
  type Concept,
  type ConceptSection,
  type DealCheck,
  type GenerateInput,
  type Occasion,
  type ProductKind,
  type SectionKey,
} from "./types";

const AUDIENCE: Record<Occasion, string> = {
  birthday: "کسی که باید همان شب غافلگیر شود",
  celebration: "مهمان یا میزبان جشن",
  host: "کسی که خانه‌اش را باز کرده",
  ingot: "کسی که وزن و سریال برایش مهم‌تر از نقش است",
};

function shellsFor(kind: ProductKind): CatalogItem[] {
  if (kind === "ingot") return SHELLS.filter((s) => s.id === "stand");
  return SHELLS.filter((s) => s.id !== "stand");
}

function dealCheck(kind: ProductKind): DealCheck {
  const karat = PRODUCT_COPY[kind].karat;
  return {
    weighOnScale: "وزن باید روی ترازوی فروشگاه خوانده شود، نه از روی عکس یا برچسب ویترین.",
    karat: `عیار این قطعه ${karat} است. انگ را با ذره‌بین روی خود فلز ببین.`,
    craftFeeSeparate:
      kind === "ingot"
        ? "برای شمش، حق ضرب و پک جدا از مظنه است. اجرت ساختِ کارشده روی شمش معنا ندارد."
        : "اجرت کار جدا از مظنه است. از فروشنده بخواه اجرت و مظنه را دو خط جدا بنویسد.",
    returnPolicy: "بازگشت فقط با جعبهٔ سالم، پلمپ نشکسته و قطعهٔ بدون خط. جعبه بخشی از محصول است.",
    notAdvice: DISCLAIMER,
  };
}

function authenticityBody(kind: ProductKind): string {
  if (kind === "ingot") {
    return "انگ پالایشگاه، وزن ضرب‌شده، سریال قابل‌خواندن از پنجرهٔ قاب، و هولوگرام. فاکتور در کشوی پایه می‌ماند.";
  }
  return "انگ عیار روی قطعه، وزن روی ترازو، و فاکتور با اجرت جدا. قیمت روز روی گواهی چاپ نمی‌شود تا برگه کهنه نشود.";
}

function ritualBody(steps: string[], seconds: number): string {
  return `حدود ${seconds} ثانیه. ترتیب تعمدی است: ${steps.join(" ← ")}. عجله یعنی بسته تبدیل به کارتن می‌شود.`;
}

function productionBody(shell: CatalogItem, interior: CatalogItem, note: string): string {
  return `پوسته «${shell.name}» با درون «${interior.name}» برای همین سفارش چیده می‌شود. نکتهٔ خریدار: ${note} ساخت از روی این پرونده است، نه از روی ویترین آماده.`;
}

function storyBody(input: GenerateInput, shell: CatalogItem, companion: CatalogItem): string {
  const occ = OCCASION_LABEL[input.occasion];
  const piece = PRODUCT_LABEL[input.productKind];
  return `این ${piece} برای «${occ}» آمده، اما آنچه به دست می‌رسد خود فلز تنها نیست. ${shell.name} اول دیده می‌شود، ${companion.name} مکث می‌سازد، بعد قطعه. نکتهٔ تو: ${input.note}`;
}

function section(
  key: SectionKey,
  body: string,
  imageUrl: string,
): ConceptSection {
  return { key, title: SECTION_LABEL[key], body, imageUrl };
}

export function composeConcept(input: GenerateInput, salt = 0): Concept {
  const seed = fnv1a(`${input.occasion}|${input.productKind}|${input.note}|${salt}`);
  const shell = pick(shellsFor(input.productKind), seed, 1);
  const interior = pick(INTERIORS, seed, 2);
  const companion = pick(COMPANIONS, seed, 3);
  const ritual = pick(RITUALS, seed, 4);
  const product = PRODUCT_COPY[input.productKind];
  const id = `zp-${input.occasion}-${input.productKind}-${hex8(seed)}`;
  const check = dealCheck(input.productKind);
  const title = `${shell.name} × ${product.name}`;
  const lede = `بستهٔ یکتا برای ${OCCASION_LABEL[input.occasion]}: ${shell.name}، ${interior.name}، همراه ${companion.name}. قطعه تنها ویترین نیست.`;

  const sections: ConceptSection[] = [
    section("product", product.body, shell.image),
    section("packageExterior", shell.body, shell.image),
    section("packageInterior", interior.body, interior.image),
    section("unboxing", ritualBody(ritual.steps, ritual.seconds), IMG.ritual),
    section("companion", companion.body, companion.image),
    section("story", storyBody(input, shell, companion), "/packages/book-medallion.jpg"),
    section("authenticity", authenticityBody(input.productKind), IMG.scale),
    section(
      "dealCheck",
      [check.weighOnScale, check.karat, check.craftFeeSeparate, check.returnPolicy, check.notAdvice].join(
        "\n",
      ),
      IMG.scale,
    ),
    section("production", productionBody(shell, interior, input.note), interior.image),
  ];

  return {
    id,
    title,
    lede,
    occasion: input.occasion,
    productKind: input.productKind,
    productName: product.name,
    audience: AUDIENCE[input.occasion],
    heroImage: shell.image,
    shellName: shell.name,
    interiorName: interior.name,
    companionName: companion.name,
    ritualSeconds: ritual.seconds,
    createdAt: new Date().toISOString(),
    seeded: false,
    source: "compose",
    note: input.note,
    dealCheck: check,
    sections,
  };
}

export function composeWave(count = 4): Concept[] {
  const occasions: Occasion[] = ["birthday", "celebration", "host", "ingot"];
  const kinds: ProductKind[] = ["necklace", "plaque", "bracelet", "earrings", "set", "ingot"];
  const notes = [
    "غافلگیری آرام، بدون روبان پلاستیکی.",
    "میزبان باید بتواند جعبه را همان شب روی میز بگذارد.",
    "کار باید سبک باشد اما بسته سنگین حس شود.",
    "نام روی قطعه نیاید؛ فقط داخل کارت.",
    "بازگشت‌پذیر با جعبهٔ سالم.",
    "مناسب سفر کوتاه؛ استوانه یا غلاف.",
  ];
  const now = Date.now();
  const out: Concept[] = [];
  const used = new Set<string>();
  for (let i = 0; i < count * 4 && out.length < count; i += 1) {
    const occasion = occasions[(now + i * 3) % occasions.length]!;
    let productKind = kinds[(now + i * 5) % kinds.length]!;
    if (occasion === "ingot") productKind = "ingot";
    if (productKind === "ingot" && occasion !== "ingot") continue;
    const note = notes[(now + i) % notes.length]!;
    const concept = composeConcept({ occasion, productKind, note }, now + i);
    if (used.has(concept.id)) continue;
    used.add(concept.id);
    out.push(concept);
  }
  return out;
}
