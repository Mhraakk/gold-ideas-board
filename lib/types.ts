export type Occasion =
  | "birthday"
  | "celebration"
  | "host"
  | "ingot";

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
  imageStatus: "ready" | "queued" | "building" | "error";
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
  createdAt: string;
  seeded: boolean;
  sections: ConceptSection[];
};

export type GoldQuote = {
  ok: true;
  usdPerOunce: number;
  fetchedAt: string;
  source: "gold-api.com";
} | {
  ok: false;
  error: string;
  lastGood: { usdPerOunce: number; fetchedAt: string } | null;
};

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
