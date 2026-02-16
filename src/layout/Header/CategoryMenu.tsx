import React from 'react';
import { Menu, ChevronRight } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const categories = [
    { name: 'Тоглоом', icon: '🎮' },
    { name: 'Гар утас', icon: '📱' },
    { name: 'Ухаалаг цаг', icon: '⌚' },
    { name: 'Таблет', icon: '📱' },
    { name: 'Компьютер', icon: '💻' },
    { name: 'Чихэвч', icon: '🎧' },
    { name: 'Гоо сайхан', icon: '💄' },
    { name: 'Гэртээ', icon: '🏠' },
    { name: 'Өсгөгч', icon: '🔊' },
    { name: 'Камер & Контент', icon: '📷' },
    { name: 'ТВ & Проектор', icon: '📺' },
];

export function CategoryMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-auto h-auto p-0 hover:bg-transparent text-black font-medium border-0 text-sm gap-2">
                    <Menu className="h-5 w-5" />
                    <span>Ангилал</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[300px] p-2 bg-white rounded-xl shadow-xl border border-gray-100">
                <div className="relative">
                    <div className="mt-12">
                        {categories.map((category, index) => (
                            <DropdownMenuItem key={index} className="flex items-center justify-between p-3 cursor-pointer rounded-lg hover:bg-gray-50 focus:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{category.icon}</span>
                                    <span className="font-medium text-gray-700">{category.name}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </DropdownMenuItem>
                        ))}
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu >
    );
}
