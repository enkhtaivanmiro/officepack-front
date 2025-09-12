import { useTranslations } from "next-intl";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-6 px-6 space-y-4 md:space-y-0">
        <p>© 2025 TEAM HUNS</p>
        <div>
          <p className="text-end mb-3 font-bold text-xs">{t("followUs")}</p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/TheHunsEsports/">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#">
              <img src="/icons/tiktok.svg" alt="TikTok" className="w-4 h-4" />
            </a>
            <a href="#">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/thehunsesports/">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
