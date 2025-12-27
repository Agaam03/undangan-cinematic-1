
export interface CoupleProfile {
  name: string;
  firstName: string; // Used for Hero big text
  role: string; // "The Groom" or "The Bride"
  handle: string;
  instagramUrl: string;
  photoUrl: string;
}

export interface WeddingEventDetail {
  time: string;
  title: string;
  location: string;
}

export interface WeddingEventGroup {
  id: string;
  date: string; // "14th July 2026"
  title: string; // "Akad Nikah"
  primaryLocation?: string; // Optional if covered in sub-events
  primaryTime?: string; // Optional if covered in sub-events
  subEvents?: WeddingEventDetail[]; // For grouping like "Ceremony & Reception"
  description?: string;
  imageMain: string;
  imageDetail?: string; // For the smaller overlapping image
}

export interface BankAccount {
  bankName: string;
  logoUrl: string;
  accountNumber: string;
  holderName: string;
}

export interface GalleryItem {
  src: string;
  spanClass: string; // e.g., "col-span-1 row-span-2" for grid layout
}

export interface StoryItem {
  title: string;
  content: string;
}

export interface WeddingData {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    videoUrl: string;
    targetDate: string; // YYYY-MM-DDTHH:mm:ss for countdown
    location: string;
    // Added posterUrl to fix type error in components/SplashScreen.tsx and components/Hero.tsx
    posterUrl?: string;
  };
  intro: {
    title: string;
    description: string;
    verseText: string;
    verseReference: string;
  };
  couple: {
    groom: CoupleProfile;
    bride: CoupleProfile;
  };
  schedule: WeddingEventGroup[];
  loveStory: {
    title: string;
    quote: string;
    quoteAuthor: string;
    videoUrl: string;
    stories: StoryItem[];
    estYear: string;
    // Added posterUrl to fix type error in components/LoveStory.tsx
    posterUrl?: string;
  };
  gallery: { src: string }[];
  gift: {
    description: string;
    accounts: BankAccount[];
    address: {
      street: string;
      city: string;
      receiver: string;
    };
  };
  rsvp: {
    deadline: string;
    contactPhone?: string;
  };
  footer: {
    hashtags: string[];
    socialLinks: { platform: string; url: string }[];
    backgroundImage: string;
    // Added videoUrl to support properties provided in data.ts
    videoUrl?: string;
  };
  music?: {
    url: string;
    autoPlay: boolean;
  };
}
