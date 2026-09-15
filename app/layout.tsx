import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Brackets, Rails } from "@/components/Frame";
import "./globals.css";

export const metadata = {
  title: "زرپک — بستهٔ هدیهٔ طلای کارشده",
  description: "بورد ایده‌های محصول طلا و بسته‌بندی یکتا برای تولد، جشن، میزبان و شمش اماراتی.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <div className="fg-canvas">
          <div className="fg-shell fg-brackets cl-host">
            <Brackets />
            <Rails />
            <Nav />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
