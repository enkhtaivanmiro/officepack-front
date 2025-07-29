import { atom } from 'jotai';

export const meItemsCount = atom<{ ticketCount: number; barCount: number; merchCount: number } | null>(null);
