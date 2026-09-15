import type { ProductKind } from "./types";

export type CatalogItem = {
  id: string;
  name: string;
  body: string;
  image: string;
};

export const SHELLS: CatalogItem[] = [
  {
    id: "book",
    name: "قاب کتاب‌نما",
    body: "جلد چرم تیره با لبه‌های کاغذ خام. از بیرون شبیه نسخه‌ای قدیمی است؛ داخلش چاه مخمل برای قطعه جا می‌گیرد. روی عطف، فقط یک نوار موم باریک.",
    image: "/packages/book-necklace.jpg",
  },
  {
    id: "silk",
    name: "غلاف ابریشم و موم",
    body: "غلاف ابریشم زغالی که با نخ ابریشم و مهر موم سرخ بسته می‌شود. باز کردنش صدای پارچه دارد، نه صدای کارتن.",
    image: "/packages/silk-plaque.jpg",
  },
  {
    id: "walnut",
    name: "جعبهٔ گردو کشویی",
    body: "چوب گردو روغن‌خورده با کشوی برنجی. کشو روی ریل چوبی نرم می‌لغزد؛ هیچ لولای فلزی دیده نمی‌شود.",
    image: "/packages/walnut-bracelet.jpg",
  },
  {
    id: "lacquer",
    name: "لاک مشکی و صدف",
    body: "جعبهٔ لاک مشکی با در صدفی. نور فقط روی رگه‌های صدف می‌نشیند. داخل، دو طبقه برای قطعه و گواهی.",
    image: "/packages/lacquer-set.jpg",
  },
  {
    id: "cylinder",
    name: "استوانهٔ پلمپ",
    body: "لولهٔ مقوای فشرده با پلمپ موم. شبیه محمولهٔ بایگانی است نه ویترین. یک شکاف باریک برای کارت دست‌نویس.",
    image: "/packages/cylinder-earrings.jpg",
  },
  {
    id: "candy",
    name: "پوست‌نباتی",
    body: "کاغذ بافت‌دار مچاله‌شده به شیوهٔ بستهٔ نبات قدیمی. باز کردنش کار دست است؛ هیچ نوارچسبی در کار نیست.",
    image: "/packages/candy-bangle.jpg",
  },
  {
    id: "stand",
    name: "قاب ایستادهٔ شمش",
    body: "قاب عمودی لاک‌خورده با پنجرهٔ سریال و کشوی باریک فاکتور در پایه. شمش دیده می‌شود، اما هنوز در قاب خودش است.",
    image: "/packages/ingot-frame.jpg",
  },
];

export const INTERIORS: CatalogItem[] = [
  {
    id: "velvet-well",
    name: "چاه مخمل به فرم قطعه",
    body: "فرورفتگی مخمل دقیقاً به شکل قطعه بریده شده. قطعه تکان نمی‌خورد و از جعبه جدا دیده نمی‌شود.",
    image: "/packages/detail-velvet.jpg",
  },
  {
    id: "suede",
    name: "سینی جیر",
    body: "سینی جیر با لبهٔ کوتاه. قطعه روی سطح می‌خوابد، نه آویزان. جیر اثر انگشت را کم نشان می‌دهد.",
    image: "/packages/walnut-bracelet.jpg",
  },
  {
    id: "double",
    name: "طبقهٔ دوگانه",
    body: "طبقهٔ بالا قطعه، طبقهٔ پایین گواهی و همراه. درِ بالا باید کامل باز شود تا پایین دیده شود.",
    image: "/packages/lacquer-set.jpg",
  },
  {
    id: "mirror",
    name: "آینه پشت در",
    body: "پشت در جعبه آینهٔ دودی است. وقتی باز می‌شود قطعه دو بار دیده می‌شود؛ یک‌بار در چاه، یک‌بار در بازتاب.",
    image: "/packages/mirror-chain.jpg",
  },
  {
    id: "cert-drawer",
    name: "کشوی گواهی",
    body: "کشو باریک زیر نشیمن قطعه. گواهی موم‌خورده فقط بعد از دیدن قطعه بیرون می‌آید.",
    image: "/packages/ingot-frame.jpg",
  },
  {
    id: "felt",
    name: "نشیمن نمد فشرده",
    body: "نمد فشرده با برش لیزری. بی‌صدا، سنگین، و برای گوشواره یا پلاک‌های کوچک پایدار.",
    image: "/packages/cylinder-plaque.jpg",
  },
];

export const COMPANIONS: CatalogItem[] = [
  {
    id: "card",
    name: "کارت دست‌نویس",
    body: "یک کارت کوچک با جوهر کربنی. متن را فروشگاه نمی‌نویسد؛ جای خالی برای یک جمله از خریدار می‌ماند.",
    image: "/packages/detail-companions.jpg",
  },
  {
    id: "booklet",
    name: "دفترچهٔ داستان",
    body: "دفترچهٔ هشت‌صفحه‌ای با کاغذ لبه‌خام. داستان قطعه و مناسبت، نه کاتالوگ فروش.",
    image: "/packages/book-medallion.jpg",
  },
  {
    id: "wax-cert",
    name: "گواهی موم‌خورده",
    body: "برگ گواهی با مهر موم. وزن، عیار و انگ روی آن آمده؛ قیمت روز روی گواهی چاپ نمی‌شود.",
    image: "/packages/detail-scale.jpg",
  },
  {
    id: "tea",
    name: "چای کتانی",
    body: "یک بسته‌چای در کیسهٔ کتان. باز کردن بسته با چای تمام می‌شود، نه با کارتن خالی.",
    image: "/packages/silk-plaque.jpg",
  },
  {
    id: "honey",
    name: "عسل کوچک",
    body: "شیشهٔ کوچک عسل با نخ کتان. برای میزبان یا سفره؛ طعمی که بعد از طلا در دهان می‌ماند.",
    image: "/packages/book-medallion.jpg",
  },
  {
    id: "candle",
    name: "شمع تاریخ‌دار",
    body: "شمع کوتاه با تاریخ مناسبت روی نوار کاغذی دور ظرف. فقط همان شب معنا دارد.",
    image: "/packages/lacquer-set.jpg",
  },
  {
    id: "voice",
    name: "کارت صدا به صفحهٔ داستان",
    body: "کارت با کد کوتاه که صفحهٔ داستان همین پرونده را باز می‌کند. صدا ضبط‌شده نیست؛ متن آنجا خوانده می‌شود.",
    image: "/packages/cylinder-earrings.jpg",
  },
];

export const RITUALS: { id: string; steps: string[]; seconds: number }[] = [
  {
    id: "ribbon-wax-drawer",
    seconds: 42,
    steps: ["نوار ابریشم", "مهر موم", "کشو", "قطعه"],
  },
  {
    id: "wrap-cert-piece",
    seconds: 38,
    steps: ["پوست کاغذ", "گواهی", "چاه مخمل", "قطعه"],
  },
  {
    id: "lid-mirror-well",
    seconds: 40,
    steps: ["در جعبه", "آینه", "طبقهٔ بالا", "قطعه"],
  },
  {
    id: "seal-slit-card",
    seconds: 36,
    steps: ["پلمپ استوانه", "کارت از شکاف", "درپوش", "قطعه"],
  },
  {
    id: "stand-window-drawer",
    seconds: 44,
    steps: ["دیدن سریال از پنجره", "کشوی فاکتور", "آزاد کردن قاب", "شمش"],
  },
  {
    id: "candy-honey-bangle",
    seconds: 39,
    steps: ["تا کردن کاغذ", "عسل کنار دست", "رسیدن به فلز", "قطعه"],
  },
];

export const PRODUCT_COPY: Record<ProductKind, { name: string; body: string; karat: string }> = {
  necklace: {
    name: "گردنی کارشده",
    body: "گردنی اجرت‌دار با کار دست روی زنجیر یا پلاک متصل. وزن روی ترازو خوانده می‌شود؛ طول زنجیر در فاکتور می‌آید.",
    karat: "۱۸ عیار (۷۵۰)",
  },
  plaque: {
    name: "پلاک حک‌شده",
    body: "پلاک با سطح حک یا صیقل. جا برای نام یا نقش محدود است تا کار شلوغ نشود.",
    karat: "۱۸ عیار (۷۵۰)",
  },
  bracelet: {
    name: "دستبند کارشده",
    body: "دستبند با قفل قابل‌تست. اندازه دور مچ قبل از ساخت بسته می‌شود، نه بعد از تحویل.",
    karat: "۱۸ عیار (۷۵۰)",
  },
  earrings: {
    name: "گوشواره جفت",
    body: "جفت متقارن با پشت‌گوش ایمن. وزن هر گوش جدا روی برگه نوشته می‌شود.",
    karat: "۱۸ عیار (۷۵۰)",
  },
  set: {
    name: "ست هماهنگ",
    body: "دو یا سه قطعه با یک زبان ساخت. ست در یک پوسته می‌ماند؛ جدا فروخته نمی‌شود مگر درخواست کتبی.",
    karat: "۱۸ عیار (۷۵۰)",
  },
  ingot: {
    name: "شمش اماراتی",
    body: "شمش با سریال و هولوگرام پالایشگاه. اجرت ساخت روی شمش معنا ندارد؛ حق ضرب و پک جدا از مظنه است.",
    karat: "۲۴ عیار (۹۹۹)",
  },
};

export const IMG = {
  scale: "/packages/detail-scale.jpg",
  ritual: "/packages/detail-ritual.jpg",
  velvet: "/packages/detail-velvet.jpg",
  companions: "/packages/detail-companions.jpg",
} as const;
