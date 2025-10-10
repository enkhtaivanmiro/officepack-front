"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCart } from "../../hooks/useCart";

export default function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMounted, setIsMounted] = useState(false);

  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  const currentLocale = pathname.startsWith("/mn") ? "mn" : "en";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLocaleChange = (locale: string) => {
    const query = searchParams.toString();
    const newPathname = pathname.replace(/^\/(en|mn)/, `/${locale}`);
    router.push(`${newPathname}${query ? `?${query}` : ""}`);
  };

  const localizedLink = (path: string) => `/${currentLocale}${path}`;

  const cartBadge =
    itemCount > 0 && isMounted ? (
      <span
        className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold 
                   rounded-full h-5 w-5 flex items-center justify-center 
                   ring-2 ring-white"
      >
        {itemCount > 99 ? "99+" : itemCount}
      </span>
    ) : null;

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-8">
          <Link href={localizedLink("/")}>
            <img src="/icons/logo.png" alt="Team Huns" className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex space-x-6 text-sm text-black font-bold">
            <Link href={localizedLink("/")} className="hover:text-gray-600">
              {t("shop")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-6 text-black font-bold">
          <select
            className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer"
            onChange={(e) => handleLocaleChange(e.target.value)}
            value={currentLocale}
            suppressHydrationWarning
          >
            <option value="en">{t("english")}</option>
            <option value="mn">{t("mongolian")}</option>
          </select>

          <Link href={localizedLink("/cart")} className="relative">
            <ShoppingCart className="w-6 h-6 cursor-pointer text-gray-700" />

            {cartBadge}
          </Link>
        </div>
      </div>
    </header>
  );
}
