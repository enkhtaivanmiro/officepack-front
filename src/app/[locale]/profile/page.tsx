'use client';

import React, { useState } from 'react';
import { User, Package, Clock, LogOut, ChevronRight, Edit2, ShoppingBag, Trash2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePacks } from '@/hooks/usePacks';
import { useCart } from '@/hooks/useCart';

// Mock Data for Orders
const MOCK_ORDERS = [
    { id: 'ORD-001', date: '2024-02-18', total: 154000, status: 'Delivered', items: ['Wireless Mouse', 'Keyboard'] },
    { id: 'ORD-002', date: '2024-02-15', total: 45000, status: 'Processing', items: ['Laptop Stand'] },
    { id: 'ORD-003', date: '2024-01-20', total: 25000, status: 'Cancelled', items: ['USB Cable'] },
];

const ORDER_STATUS_STEPS = [
    { label: 'Захиалга авсан', completed: true, date: 'Feb 18, 10:00' },
    { label: 'Бэлтгэгдэж байна', completed: true, date: 'Feb 18, 14:30' },
    { label: 'Хүргэлтэнд гарсан', completed: false, date: 'Estimated Feb 19' },
    { label: 'Хүргэгдсэн', completed: false, date: '' },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'status' | 'packs'>('info');

    const { packs, removePack, updatePack } = usePacks();
    const { addToCart } = useCart();
    const [editingPackId, setEditingPackId] = useState<string | null>(null);

    const [userInfo, setUserInfo] = useState({
        firstName: 'Enkhtaivan',
        lastName: 'Miro',
        email: 'enkhtaivan@example.com',
        phone: '99112233',
        address: 'Ulaanbaatar, Sukhbaatar district, 1-r khoroo',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleBuyPack = (pack: typeof packs[0]) => {
        pack.items.forEach(item => {
            addToCart(item, 100); // Assuming 100 as max stock for now
        });
        alert(`Included "${pack.name}" items to your cart!`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'info':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Хувийн мэдээлэл</h2>
                            <p className="text-gray-500 text-sm">Таны хувийн мэдээлэл болон холбоо барих мэдээлэл.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Овог</label>
                                <Input name="lastName" value={userInfo.lastName} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Нэр</label>
                                <Input name="firstName" value={userInfo.firstName} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">И-мэйл хаяг</label>
                                <Input name="email" value={userInfo.email} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Утасны дугаар</label>
                                <Input name="phone" value={userInfo.phone} onChange={handleInputChange} />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700">Хаяг</label>
                                <Input name="address" value={userInfo.address} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 transition rounded-xl px-8">
                                Хадгалах
                            </Button>
                        </div>
                    </div>
                );
            case 'orders':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Захиалгын түүх</h2>
                            <p className="text-gray-500 text-sm">Таны өмнөх болон идэвхтэй захиалгууд.</p>
                        </div>

                        <div className="grid gap-4">
                            {MOCK_ORDERS.map((order) => (
                                <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                            <Package size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{order.id}</p>
                                            <p className="text-sm text-gray-500">{order.items.join(', ')}</p>
                                            <p className="text-xs text-gray-400 mt-1">{order.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-xs font-medium",
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-red-100 text-red-700'
                                        )}>
                                            {order.status}
                                        </span>
                                        <p className="font-bold text-gray-900">{order.total.toLocaleString()}₮</p>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                            <ChevronRight size={16} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'status':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Захиалгын төлөв</h2>
                            <p className="text-gray-500 text-sm">Идэвхтэй захиалга: #ORD-002</p>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8">
                            <div className="relative">
                                {/* Connecting Line */}
                                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100" />

                                <div className="space-y-8 relative">
                                    {ORDER_STATUS_STEPS.map((step, index) => (
                                        <div key={index} className="flex gap-4 items-start group">
                                            {/* Status Indicator */}
                                            <div className={cn(
                                                "relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
                                                step.completed ? "bg-black border-black text-white" : "bg-white border-gray-200 text-gray-300"
                                            )}>
                                                {step.completed ? (
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <span className="w-2 h-2 rounded-full bg-current" />
                                                )}
                                            </div>

                                            {/* Status Info */}
                                            <div className="pt-1">
                                                <h4 className={cn("font-semibold text-base transition-colors", step.completed ? "text-black" : "text-gray-400")}>
                                                    {step.label}
                                                </h4>
                                                {step.date && <p className="text-xs text-gray-500 mt-1">{step.date}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                                    <p className="font-bold text-gray-900">Feb 19, 2024</p>
                                </div>
                                <Button variant="border" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                                    Track details
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 'packs':
                if (editingPackId) {
                    // EDITING VIEW (Only remove or change quantity)
                    const packToEdit = packs.find(p => p.id === editingPackId);
                    if (!packToEdit) {
                        setEditingPackId(null);
                        return null;
                    }

                    const currentTotal = packToEdit.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

                    return (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">Edit Pack: {packToEdit.name}</h2>
                                    <p className="text-gray-500 text-sm">Modify items in your pack.</p>
                                </div>
                                <Button variant="ghost" onClick={() => setEditingPackId(null)} className="text-gray-500 hover:text-black">
                                    <X size={20} className="mr-2" /> Close
                                </Button>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white border border-gray-100 rounded-xl p-4 min-h-[200px]">
                                    <h4 className="font-semibold mb-3 text-sm text-gray-700">Items in this Pack</h4>
                                    {packToEdit.items.length === 0 ? (
                                        <div className="text-center py-10 text-gray-400 text-sm">
                                            No items left in this pack.
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {packToEdit.items.map(item => (
                                                <div key={`${item.id}-${item.variantId || ''}`} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium">{item.name}</p>
                                                        <p className="text-xs text-gray-500">{item.price.toLocaleString()}₮</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center bg-white border border-gray-200 rounded-md">
                                                            <button
                                                                onClick={() => {
                                                                    const newItems = packToEdit.items.map(i => {
                                                                        if (i.id === item.id && i.variantId === item.variantId) {
                                                                            return { ...i, quantity: Math.max(1, i.quantity - 1) };
                                                                        }
                                                                        return i;
                                                                    });
                                                                    updatePack(packToEdit.id, newItems);
                                                                }}
                                                                className="px-2 py-1 text-gray-500 hover:bg-gray-100 text-xs"
                                                            >-</button>
                                                            <span className="text-xs w-6 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => {
                                                                    const newItems = packToEdit.items.map(i => {
                                                                        if (i.id === item.id && i.variantId === item.variantId) {
                                                                            return { ...i, quantity: i.quantity + 1 };
                                                                        }
                                                                        return i;
                                                                    });
                                                                    updatePack(packToEdit.id, newItems);
                                                                }}
                                                                className="px-2 py-1 text-gray-500 hover:bg-gray-100 text-xs"
                                                            >+</button>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                const newItems = packToEdit.items.filter(i => !(i.id === item.id && i.variantId === item.variantId));
                                                                updatePack(packToEdit.id, newItems);
                                                            }}
                                                            className="text-red-400 hover:text-red-500"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-xl">
                                    <div>
                                        <p className="text-xs text-gray-400">Total Price</p>
                                        <p className="text-xl font-bold">{currentTotal.toLocaleString()}₮</p>
                                    </div>
                                    <Button onClick={() => setEditingPackId(null)} className="bg-white text-black hover:bg-gray-200">
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                }

                // PACKS LIST VIEW
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">My Packs</h2>
                                <p className="text-gray-500 text-sm">Manage your custom bundle packs.</p>
                            </div>
                        </div>

                        {packs.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Package size={32} className="text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No packs created yet</h3>
                                <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                                    Create custom packs to quickly re-order your favorite office supplies.
                                    Go to your Cart and click "Save as Pack".
                                </p>
                                <Button
                                    onClick={() => setActiveTab('info')} // Just a placeholder, maybe redirect to shop
                                    className="bg-black text-white hover:bg-gray-800"
                                >
                                    Start Shopping
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {packs.map(pack => {
                                    const total = pack.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                                    const itemCount = pack.items.reduce((acc, item) => acc + item.quantity, 0);

                                    return (
                                        <div key={pack.id} className="group relative bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                            {/* Gradient Decoration */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                            <div className="relative z-10">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{pack.name}</h3>
                                                        <p className="text-sm text-gray-500 font-medium">{itemCount} items inside</p>
                                                    </div>

                                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-sm border border-gray-100">
                                                        <button
                                                            onClick={() => setEditingPackId(pack.id)}
                                                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-black transition-colors"
                                                            title="Edit Pack"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Delete this pack?')) removePack(pack.id);
                                                            }}
                                                            className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                                                            title="Delete Pack"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex -space-x-3 overflow-hidden mb-8 pl-3 py-2">
                                                    {pack.items.slice(0, 5).map((item, idx) => (
                                                        <div key={idx} className="relative w-10 h-10 rounded-full ring-4 ring-white bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                                                            {item.image ? (
                                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <span className="text-xs text-gray-500 font-bold">{item.name[0]}</span>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {pack.items.length > 5 && (
                                                        <div className="relative w-10 h-10 rounded-full ring-4 ring-white bg-gray-900 text-white flex items-center justify-center text-xs font-bold shadow-sm z-10">
                                                            +{pack.items.length - 5}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                                    <div>
                                                        <p className="text-xs text-gray-400 font-medium mb-0.5">Total Value</p>
                                                        <span className="text-xl font-bold text-gray-900">{total.toLocaleString()}₮</span>
                                                    </div>
                                                    <Button
                                                        onClick={() => handleBuyPack(pack)}
                                                        className="bg-black text-white hover:bg-gray-800 rounded-xl h-11 px-6 text-sm font-medium shadow-lg shadow-gray-200 group-hover:shadow-xl transition-all"
                                                    >
                                                        <ShoppingBag size={18} className="mr-2" />
                                                        Buy Pack
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header/Banner could go here if needed, but keeping it simple based on layout */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-4 p-[2px]">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                <User size={32} className="text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Enkhtaivan Miro</h1>
                            <p className="text-gray-500">enkhtaivan@example.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Navigation */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-2">
                        <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-hide">
                            <button
                                onClick={() => { setActiveTab('info'); }}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                                    activeTab === 'info'
                                        ? "bg-black text-white shadow-lg shadow-gray-200 scale-100"
                                        : "text-gray-600 hover:bg-white hover:text-black"
                                )}
                            >
                                <User size={18} />
                                Хувийн мэдээлэл
                            </button>
                            <button
                                onClick={() => { setActiveTab('orders'); }}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                                    activeTab === 'orders'
                                        ? "bg-black text-white shadow-lg shadow-gray-200"
                                        : "text-gray-600 hover:bg-white hover:text-black"
                                )}
                            >
                                <Package size={18} />
                                Захиалгууд
                            </button>
                            <button
                                onClick={() => { setActiveTab('status'); }}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                                    activeTab === 'status'
                                        ? "bg-black text-white shadow-lg shadow-gray-200"
                                        : "text-gray-600 hover:bg-white hover:text-black"
                                )}
                            >
                                <Clock size={18} />
                                Захиалгын төлөв
                            </button>
                            <button
                                onClick={() => setActiveTab('packs')}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                                    activeTab === 'packs'
                                        ? "bg-black text-white shadow-lg shadow-gray-200"
                                        : "text-gray-600 hover:bg-white hover:text-black"
                                )}
                            >
                                <ShoppingBag size={18} />
                                Миний Багцууд
                            </button>
                        </nav>

                        <div className="hidden lg:block pt-8 border-t border-gray-200 mt-4">
                            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full">
                                <LogOut size={18} />
                                Гарах
                            </button>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 min-h-[500px]">
                        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-100 shadow-sm">
                            {renderContent()}
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
}
