import type { Metadata } from "next";
import { Geist, Noto_Sans_Bengali } from "next/font/google";
import { cookies } from "next/headers";
import { LocaleProvider } from "@/i18n/provider";
import { isLocale, defaultLocale } from "@/i18n";
import { ToastProvider } from "@/components/ui/Toast";
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
  title: "Healtho Medical Center",
  description: "Compassionate healthcare in Dhaka.",
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
        <LocaleProvider initialLocale={locale}><ToastProvider>{children}</ToastProvider></LocaleProvider>
      </body>
    </html>
  );
}
