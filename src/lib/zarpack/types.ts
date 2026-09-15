export type Occasion = "birthday" | "celebration" | "host" | "ingot";

export type ProductKind =
  | "necklace"
  | "plaque"
  | "bracelet"
  | "earrings"
  | "set"
  | "ingot";

export type SectionKey =
  | "product"
  | "packageExterior"
  | "packageInterior"
  | "unboxing"
  | "companion"
  | "story"
  | "authenticity"
  | "dealCheck"
  | "production";

export type ConceptSection = {
  key: SectionKey;
  title: string;
  body: string;
  imageUrl: string;
};

export type DealCheck = {
  weighOnScale: string;
  karat: string;
  craftFeeSeparate: string;
  returnPolicy: string;
  notAdvice: string;
};

export type Concept = {
  id: string;
  title: string;
  lede: string;
  occasion: Occasion;
  productKind: ProductKind;
  productName: string;
  audience: string;
  heroImage: string;
  shellName: string;
  interiorName: string;
  companionName: string;
  ritualSeconds: number;
  createdAt: string;
  seeded: boolean;
  source: "seed" | "compose" | "model";
  note: string;
  dealCheck: DealCheck;
  sections: ConceptSection[];
};

export type GoldQuote =
  | {
      ok: true;
      usdPerOunce: number;
      fetchedAt: string;
      source: "gold-api.com";
      mazanehHint: string;
      disclaimer: string;
    }
  | {
      ok: false;
      error: string;
      lastGood: { usdPerOunce: number; fetchedAt: string } | null;
      disclaimer: string;
    };

export type GenerateInput = {
  occasion: Occasion;
  productKind: ProductKind;
  note: string;
};

export const OCCASIONS: Occasion[] = ["birthday", "celebration", "host", "ingot"];
export const PRODUCT_KINDS: ProductKind[] = [
  "necklace",
  "plaque",
  "bracelet",
  "earrings",
  "set",
  "ingot",
];

export const OCCASION_LABEL: Record<Occasion, string> = {
  birthday: "تولد",
  celebration: "جشن و مهمانی",
  host: "هدیه به میزبان",
  ingot: "شمش اماراتی",
};

export const PRODUCT_LABEL: Record<ProductKind, string> = {
  necklace: "گردنی",
  plaque: "پلاک",
  bracelet: "دستبند",
  earrings: "گوشواره",
  set: "ست",
  ingot: "شمش",
};

export const SECTION_LABEL: Record<SectionKey, string> = {
  product: "قطعهٔ طلا",
  packageExterior: "پوستهٔ بسته",
  packageInterior: "درون جعبه",
  unboxing: "آیین گشودن",
  companion: "همراه بسته",
  story: "داستان قطعه",
  authenticity: "اصالت",
  dealCheck: "دیل‌چک",
  production: "یادداشت ساخت",
};

export const DISCLAIMER = "این فقط اطلاعات است، نه توصیه‌ی مالی.";
export const FED_AT = "2026-09-16T18:00:00.000Z";
export const FAV_KEY = "zarpack-favs";
export const LOCAL_CONCEPTS_KEY = "zarpack-concepts";
