
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PriceUnit } from '@/types/property';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPropertyPrice(amount: number, unit: PriceUnit = 'none'): string {
  const price = formatCurrency(amount);
  const suffixes: Record<Exclude<PriceUnit, 'none'>, string> = {
    'sq-ft': '/ sq.ft',
    'sq-yard': '/ sq.yard',
    cent: '/ cent',
    acre: '/ acre',
    ground: '/ ground',
    unit: '/ unit'
  };

  return unit === 'none' ? price : `${price} ${suffixes[unit]}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function getImagePlaceholder(): string {
  return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200';
}
