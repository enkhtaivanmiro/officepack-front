import { ShoppingCart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-8">
          <img src="/icons/logo.png" alt="Team Huns" className="h-8 w-auto" />
          <nav className="hidden md:flex space-x-6 text-sm text-black font-bold">
            <a href="#" className="hover:text-gray-600">
              SHOP
            </a>
            <a href="#" className="hover:text-gray-600">
              TEAM
            </a>
            <a href="#" className="hover:text-gray-600">
              MATCH
            </a>
            <a href="#" className="hover:text-gray-600">
              ABOUT
            </a>
            <a href="#" className="hover:text-gray-600">
              ACHIEVEMENT
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-6 text-black font-bold">
          <select className="text-sm border-none bg-transparent focus:ring-0">
            <option>English</option>
            <option>Монгол</option>
          </select>
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
