import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentLocale = pathname.startsWith("/mn") ? "mn" : "en";

  const handleLocaleChange = (locale: string) => {
    const query = searchParams.toString();
    const newPathname = pathname.replace(/^\/(en|mn)/, `/${locale}`);
    router.push(`${newPathname}${query ? `?${query}` : ""}`);
  };

  const localizedLink = (path: string) => `/${currentLocale}${path}`;

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
          >
            <option value="en">{t("english")}</option>
            <option value="mn">{t("mongolian")}</option>
          </select>

          <Link href={localizedLink("/cart")}>
            <ShoppingCart className="w-5 h-5 cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
}
