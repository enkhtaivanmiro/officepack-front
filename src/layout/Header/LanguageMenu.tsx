"use client";
import React from 'react';
import { Globe, Check } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// Helper to get flag emoji or SVG
const flags = {
    mn: '🇲🇳',
    en: '🇺🇸',
};

export function LanguageMenu() {
    const [currentLang, setCurrentLang] = React.useState('mn');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full border-0">
                    <Globe className="h-6 w-6 text-black" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl shadow-xl border border-gray-100 bg-white">
                <DropdownMenuItem
                    className="flex items-center justify-between p-3 cursor-pointer rounded-lg hover:bg-gray-50 focus:bg-gray-50"
                    onClick={() => setCurrentLang('mn')}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-xl">{flags.mn}</span>
                        <span className="font-medium text-black">Монгол</span>
                    </div>
                    {currentLang === 'mn' && <Check className="w-4 h-4 text-black" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex items-center justify-between p-3 cursor-pointer rounded-lg hover:bg-gray-50 focus:bg-gray-50"
                    onClick={() => setCurrentLang('en')}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-xl">{flags.en}</span>
                        <span className="font-medium text-black">English</span>
                    </div>
                    {currentLang === 'en' && <Check className="w-4 h-4 text-black" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
