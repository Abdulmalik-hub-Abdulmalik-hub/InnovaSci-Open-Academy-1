import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format, isAfter, isBefore, addDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  currency: string = "USD"
): string {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  
  if (numericPrice === 0) return "Free";
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(numericPrice);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

export function formatVideoDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatDate(
  date: Date | string,
  formatString: string = "MMM dd, yyyy"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, formatString);
}

export function isEnrolled(expiresAt?: Date | string): boolean {
  if (!expiresAt) return true;
  
  const expiry = typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
  return isAfter(expiry, new Date());
}

export function getDaysUntilExpiry(expiresAt: Date | string): number {
  const expiry = typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
  const now = new Date();
  
  if (isBefore(expiry, now)) return 0;
  
  const diffTime = expiry.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export function generateCourseCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "ISA-";
  
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return code;
}

export function generateVerificationCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  
  for (let i = 0; i < 12; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
    if ((i + 1) % 4 === 0 && i < 11) code += "-";
  }
  
  return code;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getDifficultyColor(level: string): string {
  switch (level.toLowerCase()) {
    case "beginner":
      return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
    case "intermediate":
      return "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
    case "advanced":
      return "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400";
    case "expert":
      return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400";
  }
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
    case "published":
    case "completed":
    case "success":
      return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
    case "pending":
    case "draft":
    case "review":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "suspended":
    case "archived":
    case "failed":
      return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
    case "inactive":
    case "deactivated":
      return "text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400";
    default:
      return "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
  }
}

export function calculateProgress(
  completedLessons: number,
  totalLessons: number
): number {
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function getVideoProvider(url: string): string {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  }
  if (url.includes("vimeo.com")) {
    return "vimeo";
  }
  if (url.includes("cloudflare.com") || url.includes("videodelivery.net")) {
    return "cloudflare";
  }
  if (url.includes("supabase.co") || url.includes("supabase")) {
    return "supabase";
  }
  return "custom";
}

export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

export function extractVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural || `${singular}s`);
}

export function groupBy<T>(
  array: T[],
  key: keyof T | ((item: T) => string | number)
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey =
      typeof key === "function" ? String(key(item)) : String(item[key]);
    
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}