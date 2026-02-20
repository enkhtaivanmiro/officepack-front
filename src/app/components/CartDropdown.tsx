'use client';

import React from 'react';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useCart } from '../../hooks/useCart';
import { usePacks } from '../../hooks/usePacks';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function CartDropdown() {
    const { cart, getTotalItems, getTotalPrice, removeFromCart } = useCart();
    const { addPack } = usePacks();
    const router = useRouter();
    const t = useTranslations('Cart');

    const itemCount = getTotalItems();
    const totalPrice = getTotalPrice();

    const handleCheckout = () => {
        router.push('/address');
    };

    const handleSaveAsPack = () => {
        if (cart.length === 0) return;

        const packName = prompt("Enter a name for your pack:");
        if (!packName) return;

        addPack(packName, cart);
        alert(`Pack "${packName}" saved! You can view it in your Profile.`);
    };

    const handleViewCart = () => {
        router.push('/cart');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="relative outline-none">
                    <ShoppingCart className="w-6 h-6 text-gray-300 hover:text-white transition" />
                    {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-black">
                            {itemCount > 99 ? '99+' : itemCount}
                        </span>
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0 bg-white border-gray-200">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-black">Shopping Cart</h3>
                    <span className="text-xs text-gray-500">{itemCount} items</span>
                </div>

                <div className="max-h-[300px] overflow-y-auto p-2 space-y-2">
                    {cart.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 text-sm">
                            Your cart is empty
                        </div>
                    ) : (
                        cart.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition group">
                                <div className="w-12 h-12 relative bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-black truncate">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.quantity} x {item.price.toLocaleString()}₮</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeFromCart(item.id, item.variantId);
                                    }}
                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-3">
                        <div className="flex justify-between items-center font-bold text-black">
                            <span>Subtotal</span>
                            <span>{totalPrice.toLocaleString()}₮</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Button onClick={handleViewCart} variant="border" className="w-full text-xs h-9">
                                View Cart
                            </Button>
                            <Button onClick={handleCheckout} className="w-full bg-black text-white hover:bg-gray-800 text-xs h-9">
                                Checkout
                            </Button>
                        </div>
                        <Button
                            onClick={handleSaveAsPack}
                            variant="ghost"
                            className="w-full text-xs h-8 text-gray-600 hover:text-black hover:bg-gray-200"
                        >
                            Save current items as Pack
                        </Button>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
