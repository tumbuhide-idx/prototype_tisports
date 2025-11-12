import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatEventDate(startsAt: string, endsAt: string) {
  const startDate = new Date(startsAt);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Jakarta',
  };

  const dateString = startDate.toLocaleDateString('id-ID', options);
  const timeString = formatTimeRange(startsAt, endsAt);

  return `${dateString} • ${timeString}`;
}

export function formatTimeRange(startsAt: string, endsAt: string) {
    const startDate = new Date(startsAt);
    const endDate = new Date(endsAt);

    const startTimeString = startDate.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta',
    }).replace(/\./g, ':');

    const endTimeString = endDate.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta',
    }).replace(/\./g, ':');

    return `${startTimeString} - ${endTimeString} WIB`;
}


export function formatShortDate(startsAt: string) {
    const startDate = new Date(startsAt);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Jakarta',
    };
    return startDate.toLocaleDateString('id-ID', options);
}
