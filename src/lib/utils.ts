import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMarketCap(value: number): string {
  const absValue = Math.abs(value);
  if (absValue >= 1_000_000_000_000) {
    return (value / 1_000_000_000_000).toFixed(1) + 'T';
  }
  if (absValue >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1) + 'B';
  }
  if (absValue >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + 'M';
  }
  if (absValue >= 1_000) {
    return (value / 1_000).toFixed(1) + 'K';
  }
  return value.toString();
}
