import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges and concatenates tailwind class names
 * @param {ClassValue[]} inputs - An array of tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses a time string and returns the total number of milliseconds.
 * @param {string} time Time string in the format of "123h45m30s".
 */
export function parseTime(time?: string | null) {
  if (!time) return 0;
  if (time.toLowerCase() === "infinity") return Infinity;

  return Array.from(time.matchAll(/(\d+)(\w?)/g)).reduce((total, chunk) => {
    const [, value, unit] = chunk;
    return total + parseInt(value!) * (units[unit as keyof typeof units] || 1);
  }, 0);
}

/**
 * Formats a given number of milliseconds into a human-readable time string
 * @param {number | undefined} milliseconds - The number of milliseconds
 * @example `123h45m30s`
 */
export function formatTime(milliseconds?: number) {
  if (!milliseconds || milliseconds < 0) return "0";
  if (Number.isNaN(milliseconds)) return "NaN";
  if (!Number.isFinite(milliseconds)) return "Infinity";

  return (
    Object.entries(units).reduce((acc, [unit, value]) => {
      const count = Math.floor(milliseconds! / value);
      milliseconds! %= value;
      return count > 0 ? `${acc}${count}${unit}` : acc;
    }, "") || `${milliseconds}ms`
  );
}

export function unixDay(date = new Date(), timezoneAdjust = true) {
  const adjust = timezoneAdjust ? date.getTimezoneOffset() * units.m : 0;
  return Math.floor((+date - adjust) / units.d);
}

const units = {
  w: 7 * 24 * 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
  h: 60 * 60 * 1000,
  m: 60 * 1000,
  s: 1000,
} as const;
