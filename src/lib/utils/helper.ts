import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { isArray } from 'lodash';

import { PriceType } from '@/schema';

export const CurrencyMap: Record<string, string> = {
  mnt: '₮',
  usd: '$',
};
import 'dayjs/locale/en';
import 'dayjs/locale/mn';
dayjs.locale('mn');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Ulaanbaatar');

export function formatMoney(money?: PriceType, abbreviated?: boolean) {
  const val = money?.amount;
  const currency = CurrencyMap[money?.currency || 'mnt'] || '₮';
  if (!val) return '';
  if (abbreviated) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(`${val}`.length / 3);
    const valueNum = parseInt(`${val}`, 10);
    let shortValue = parseFloat((suffixNum != 0 ? valueNum / Math.pow(1000, suffixNum) : valueNum).toPrecision(2));
    if (shortValue % 1 !== 0) {
      return `${currency}${shortValue.toFixed(1)}${suffixes[suffixNum]}`;
    }
    return `${currency}${shortValue}${suffixes[suffixNum]}`;
  }
  let value = val;
  if (`${value}`.includes('.')) {
    value = parseFloat(`${value}`).toFixed(2);
  }

  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '’')} ${currency}`;
}

export function timezoneDate(date?: string) {
  return dayjs.tz(date ? new Date(date) : new Date());
}

export function rangePrice(sellPrice: PriceType[] | PriceType) {
  if (!isArray(sellPrice)) return formatMoney(sellPrice);

  const [min, max] = sellPrice;
  if (!max || (max?.amount === min?.amount && max?.currency === min?.currency)) {
    return formatMoney(min);
  }
  return `${formatMoney(min)} - ${formatMoney(max)}`;
}

export function getShortHash(objectId: string) {
  return objectId.substring(objectId.length - 6);
}
export function getLocalstorage(key: string, initial: any, notJson?: boolean) {
  if (typeof window !== 'undefined') {
    const local = localStorage?.getItem(key);
    if (local) {
      return notJson ? local : JSON.parse(local);
    }
  }
  return initial;
}

const labels: Record<string, string> = {
  s: 'seat',
  R: 'row',
  S: 'sector',
  t: 'table',
  F: 'floor',
  V: 'vip',
};

export function extractSeat(val: string) {
  return val.split('-').reduce((acc, cur) => {
    // @ts-ignore
    const [first, ...rest] = cur;
    if (labels[first]) {
      // @ts-ignore
      acc.push({ label: labels[first], value: rest.join('').replace('_', '.') });
    }
    return acc;
  }, []) as Array<{ label: string; value: string }>;
}

export function stripHTML(html?: string) {
  return (html || '')?.replace(/<[^>]+>/g, '');
}

export function searchParamsToObject(searchParams: URLSearchParams): { [key: string]: string | string[] } {
  const object: { [key: string]: string | string[] } = {};

  searchParams.forEach((value, key) => {
    if (Array.isArray(value)) {
      object[key] = value;
    } else {
      object[key] = value;
    }
  });

  return object;
}

export function calcSalePercent(old?: PriceType, price?: PriceType) {
  if (!old || !price) return;
  const percent = 100 - (parseInt(`${price.amount}`, 10) * 100) / parseInt(`${old.amount}`, 10);
  if (`${percent}`.includes('.')) return percent.toFixed(2);
  return percent;
}

export function moveToFirst<T>(arr: T[], condition: (item: T) => boolean): T[] {
  // Find the index of the element
  const index = arr.findIndex(condition);
  if (index === -1) return arr; // If not found, return the array as is

  // Remove the element and store it
  const [element] = arr.splice(index, 1);

  // Add it to the start of the array
  arr.unshift(element);

  return arr;
}

export function colorsToLinearGradient(colors: string[], direction = 'to right') {
  if (!Array.isArray(colors) || colors.length === 0) {
    console.error('Invalid colors array provided');
    return '';
  }
  return `linear-gradient(${direction}, ${colors.join(', ')})`;
}

export function usernameOrEmail(username?: string, email?: string) {
  if (username?.startsWith('google_') || username?.startsWith('facebook_')) return email || '';

  return username || '';
}

export function cognitoErrorToKey(string?: string): string {
  return (string || '').replace(/[^a-zA-Z0-9 ]/g, '');
}

export function scrollToElement(selector: string) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
}

export function resizeImg(url?: string, size?: 'm' | '') {
  if (!url) return '';
  if (size === 'm') {
    const nameParts = url.split('.');
    const extension = nameParts.pop();
    return `${nameParts.join('.')}_m.${extension}`;
  }
  return url;
}

export function calcSaleRoll(qty: number, amount: number) {
  if (qty < 5) return 0;
  if (qty >= 5 && qty < 10) return qty * amount * 0.1;
  return qty * amount * 0.15;
}

// export function calculatePrice(ticketTemplates: TicketTemplateT[], templateDic: any, promo: Promo) {
//   if (promo.templateId)
//     return ticketTemplates.reduce((p, c) => {
//       let factor: number;
//       if (c.isSeat) {
//         factor = templateDic[c._id.toString()].length;
//       } else {
//         factor = templateDic[c._id.toString()];
//       }
//       if (promo.templateId.toString() === c._id.toString()) {
//         if (promo.discountType === 'fixed') return p + factor * (c.sellPrice.amount - promo.discountValue);
//         return p + factor * ((c.sellPrice.amount * promo.discountValue) / 100);
//       }
//       return p + factor * c.sellPrice.amount;
//     }, 0);
//   return ticketTemplates.reduce((p, c) => {
//     let factor: number;
//     if (c.isSeat) {
//       factor = templateDic[c._id.toString()].length;
//     } else {
//       factor = templateDic[c._id.toString()];
//     }
//     if (promo.discountType === 'fixed') return p + factor * (c.sellPrice.amount - promo.discountValue);
//     return p + factor * ((c.sellPrice.amount * promo.discountValue) / 100);
//   }, 0);
// }
