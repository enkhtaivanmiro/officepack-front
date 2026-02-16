import React from 'react';
import { UserCircle2, User, Megaphone, HelpCircle, ChevronRight } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function ProfileMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full border-0">
                    <UserCircle2 className="h-6 w-6 text-black" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl shadow-xl border border-gray-100 bg-white">
                <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer rounded-lg hover:bg-gray-50 focus:bg-gray-50">
                    <UserCircle2 className="w-5 h-5 text-black" />
                    <span className="font-medium text-black">Нэвтрэх</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer rounded-lg hover:bg-gray-50 focus:bg-gray-50">
                    <Megaphone className="w-5 h-5 text-black" />
                    <span className="font-medium text-black">Boom Hack</span>
                </DropdownMenuItem>
                <div className="my-1 h-px bg-gray-100"></div>
                <DropdownMenuItem className="flex items-center justify-between p-3 cursor-pointer rounded-lg bg-gray-50 hover:bg-gray-100 focus:bg-gray-100">
                    <div className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-black" />
                        <span className="font-medium text-black">Тусламж</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-black" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
