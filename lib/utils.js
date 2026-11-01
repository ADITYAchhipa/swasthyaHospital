import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind CSS support
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate distance between two GPS coordinates using the Haversine formula
 * @param {number} lat1 Latitude of first point
 * @param {number} lon1 Longitude of first point
 * @param {number} lat2 Latitude of second point
 * @param {number} lon2 Longitude of second point
 * @returns {number|null} Distance in kilometers or null if invalid
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) return null;
  if (lat1 === null || lon1 === null || lat2 === null || lon2 === null) return null;

  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

/**
 * Format date string into a localized human-readable date
 * @param {string|Date} date
 * @param {object} options Intl.DateTimeFormatOptions
 * @returns {string}
 */
export function formatDate(date, options = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!date) return 'N/A';
  try {
    return new Date(date).toLocaleDateString('en-IN', options);
  } catch {
    return String(date);
  }
}

/**
 * Return formatted blood group badge label
 * @param {string} bg
 * @returns {string}
 */
export function formatBloodGroup(bg) {
  if (!bg) return 'Unknown';
  return bg.trim().toUpperCase();
}
