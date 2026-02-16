"use client";

import React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CartPopover() {
    const { cart, getTotalItems, getTotalPrice, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const itemCount = getTotalItems();
    const totalPrice = getTotalPrice();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 rounded-full border-0 w-10 h-10">
                    <ShoppingCart className="h-6 w-6 text-black" />
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#FF5645] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                            {itemCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[380px] p-0 rounded-2xl shadow-xl border border-gray-100 bg-white">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg text-black">Сагс</h3>
                        <p className="text-sm text-gray-500">{itemCount} бүтээгдэхүүн</p>
                    </div>
                </div>

                <div className="flex flex-col h-[400px]">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center flex-1 py-12 px-6 text-center">
                            <div className="w-48 h-48 relative mb-4 flex items-center justify-center bg-gray-50 rounded-full">
                                <ShoppingCart className="h-16 w-16 text-gray-300" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Сагс хоосон байна</h4>
                            <p className="text-gray-500 text-sm">Та хүссэн бараагаа сагсандаа хийгээрэй</p>
                        </div>
                    ) : (
                        <ScrollArea className="h-full">
                            <div className="p-4 space-y-4">
                                {cart.map((item) => (
                                    <div key={`${item.id}-${item.variantId}`} className="flex gap-4">
                                        <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                            <Image
                                                src={item.image || '/icons/tshirt.png'}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-medium text-sm text-black truncate pr-4" title={item.name}>
                                                    {item.name}
                                                </h4>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.variantId)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            {(item.color || item.size) && (
                                                <div className="flex gap-2 mt-1 text-xs text-gray-500">
                                                    {item.color && <span>{item.color}</span>}
                                                    {item.size && <span>{item.size}</span>}
                                                </div>
                                            )}
                                            <div className="flex justify-between items-end mt-2">
                                                <span className="font-bold text-black">{item.price.toLocaleString()}₮</span>
                                                <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-2 py-1">
                                                    <button
                                                        onClick={() => decreaseQuantity(item.id, item.variantId)}
                                                        className="text-gray-500 hover:text-black disabled:opacity-50"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => increaseQuantity(item.id, item.variantId)}
                                                        className="text-gray-500 hover:text-black"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 font-medium">Нийт:</span>
                        <span className="text-xl font-bold text-black">{totalPrice.toLocaleString()}₮</span>
                    </div>
                    <Button className="w-full bg-[#101010] text-white hover:bg-[#202020] rounded-xl h-12" disabled={itemCount === 0}>
                        Худалдан авах
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
