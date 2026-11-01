import type { Metadata } from "next";
import { Geist, Noto_Sans_Bengali } from "next/font/google";
import { cookies } from "next/headers";
import { LocaleProvider } from "@/i18n/provider";
import { isLocale, defaultLocale } from "@/i18n";
import { ToastProvider } from "@/components/ui/Toast";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bangla = Noto_Sans_Bengali({
  variable: "--font-bangla",
  subsets: ["bengali", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://healtho.example"),
  title: { default: "Healtho Medical Center | Expert Care, Human Touch", template: "%s | Healtho Medical Center" },
  description: "Compassionate healthcare, trusted doctors, diagnostics, and emergency support in Dhaka.",
  openGraph: { type: "website", siteName: "Healtho Medical Center", locale: "en_BD", title: "Healtho Medical Center | Expert Care, Human Touch", description: "Compassionate healthcare, trusted doctors, diagnostics, and emergency support in Dhaka." },
  twitter: { card: "summary_large_image", title: "Healtho Medical Center", description: "Expert care with a human touch in Dhaka." },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get("locale")?.value;
  const locale = isLocale(savedLocale) ? savedLocale : defaultLocale;
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${bangla.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider initialLocale={locale}><ToastProvider><SiteHeader/>{children}<SiteFooter/></ToastProvider></LocaleProvider>
      </body>
    </html>
  );
}
