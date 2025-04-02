// Prayer times types
export interface PrayerTime {
  name: string;
  begins: string;
  iqamah: string | null;
}

export interface PrayerTimesForDay {
  date: Date;
  prayers: PrayerTime[];
  nextPrayer: {
    name: string;
    countdown: string;
  };
}

// Event types
export interface Event {
  id: number;
  title: string;
  date: string;
  timeRange: string;
  description: string;
  type: 'Featured' | 'Weekly' | 'Monthly' | 'Special' | 'Bi-weekly';
  imageUrl?: string;
}

// News types
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
  imageUrl: string;
}

// Contact types
export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Language types
export type Language = 'en' | 'fi' | 'ar';

export interface Translations {
  [key: string]: {
    en: string;
    fi: string;
    ar: string;
  };
}
