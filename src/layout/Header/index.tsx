import React from 'react';
import { Heart, Search, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { CategoryMenu } from './CategoryMenu';
import { CartPopover } from './CartPopover';
import { ProfileMenu } from './ProfileMenu';
import { LanguageMenu } from './LanguageMenu';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white text-black sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">

          {/* Mobile: Logo on Left */}
          <div className="flex-shrink-0 md:hidden">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Officepack" width={55} height={43} priority className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop: Category & Search */}
          <div className="hidden md:flex flex-1 items-center gap-4">
            <CategoryMenu />

            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Хайлт"
                className="w-full h-11 pl-10 pr-4 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500/20 border-transparent transition-all"
              />
            </div>
          </div>

          {/* Desktop: Logo Center */}
          <div className="hidden md:block flex-shrink-0 mx-4">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Officepack" width={55} height={43} priority className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop: Actions */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-2 md:gap-4">
            <Button variant="border" size="icon" className="hover:bg-gray-100 rounded-full border-0 text-gray-700">
              <Heart className="h-6 w-6" />
            </Button>

            <CartPopover />

            <ProfileMenu />

            <LanguageMenu />
          </div>

          {/* Mobile: Sandwich Menu on Right */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[280px] p-4 bg-white rounded-xl shadow-xl border border-gray-100">
                {/* Search */}
                <div className="mb-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Хайлт"
                      className="w-full h-10 pl-10 pr-4 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500/20 border-transparent"
                    />
                  </div>
                </div>

                <DropdownMenuSeparator className="my-2" />

                {/* Category Menu */}
                <div className="py-2">
                  <CategoryMenu />
                </div>

                <DropdownMenuSeparator className="my-2" />

                {/* Heart/Wishlist */}
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Хадгалсан</span>
                </button>

                {/* Cart */}
                <div className="py-2">
                  <CartPopover />
                </div>

                {/* Profile */}
                <div className="py-2">
                  <ProfileMenu />
                </div>

                {/* Language */}
                <div className="py-2">
                  <LanguageMenu />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
