"use client";

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "../../i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import CartDropdown from "./CartDropdown";

export default function Header() {
  const t = useTranslations("Header");

  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();

  const currentLocale = useLocale();

  const [isMounted, setIsMounted] = useState(false);

  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLocaleChange = (locale: string) => {
    const href = {
      pathname: pathname,
      query: Object.fromEntries(searchParams.entries()),
    };

    router.replace(href, { locale: locale });
  };

  const localizedLink = (path: string) => path;

  const cartBadge =
    itemCount > 0 && isMounted ? (
      <span
        className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold 
                   rounded-full h-5 w-5 flex items-center justify-center 
                   ring-2 ring-black"
      >
        {itemCount > 99 ? "99+" : itemCount}
      </span>
    ) : null;

  return (
    <header className="w-full bg-black shadow-md text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* LEFT SIDE */}
        <div className="flex items-center space-x-8">
          <Link href={localizedLink("/")}>
            <img src="/icons/logo.png" alt="Team Huns" className="h-8 w-auto" />
          </Link>

          <nav className="hidden md:flex space-x-6 text-sm font-semibold">
            <Link
              href={localizedLink("/")}
              className="text-gray-300 hover:text-white transition"
            >
              {t("shop")}
            </Link>
          </nav>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-6 text-sm font-semibold">
          {/* Login */}

          <Link
            href={localizedLink("/auth/login")}
            className="relative text-gray-300 hover:text-white transition"
          >
            <p>Нэвтрэх</p>
          </Link>
          {/* Locale Switcher */}
          <select
            className="text-sm bg-black text-gray-300 border border-gray-700 rounded-md px-2 py-1 
                       focus:outline-none focus:ring-1 focus:ring-gray-500 cursor-pointer"
            onChange={(e) => handleLocaleChange(e.target.value)}
            value={currentLocale}
            suppressHydrationWarning
          >
            <option className="bg-black text-white" value="en">
              {t("english")}
            </option>
            <option className="bg-black text-white" value="mn">
              {t("mongolian")}
            </option>
          </select>

          {/* Cart Dropdown */}
          <div className="relative">
            <CartDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
