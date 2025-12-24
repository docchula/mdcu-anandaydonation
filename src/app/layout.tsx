import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Providers } from "./providers";
import { LanguageProvider } from "./context/LanguageContext";

const Noto = localFont({
  src: "../../public/fonts/NotoSansThai-VariableFont_wdth,wght.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AnandayDonation",
  description: "ลงทะเบียนบริจาควันอานันทมหิดล",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Noto.className}>
        <Providers>
          <LanguageProvider>{children}</LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
