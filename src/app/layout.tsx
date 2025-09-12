import "./globals.css";
import { montserrat } from "@/lib/fonts";

export const metadata = {
  title: "Huns-Esport",
  description: "Huns-Esport",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
