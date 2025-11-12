
export type GalleryImage = {
  url: string;
  caption?: string;
};

export type Event = {
  id: string;
  slug: string;
  title: string;
  venue: string;
  venueAddress: string;
  venueMapUrl: string;
  startsAt: string;
  endsAt:string;
  capacity: number;
  priceIDR: number;
  status: string;
  participantsMasked: string[];
  category: string;
  imageUrl: string;
  imageHint: string;
  description: string;
  details: {
    format: string;
    gameType: string[];
    includes: string[];
    bring: string[];
  };
  isMembership: boolean;
  membershipDetails?: {
    priceIDR: number;
    description: string;
    sessionDates: string[];
  };
  galleryImages?: GalleryImage[];
};

export type PaymentMethod = {
  id: string;
  type: string;
  displayName: string;
  qrisUrl?: string;
  accountNumber?: string;
  accountName?: string;
  isActive: boolean;
};

export type NewsItem = {
    id: number;
    slug: string;
    title: string;
    category: 'Pengumuman' | 'Artikel' | 'Jadwal';
    date: string;
    description: string;
    content: string;
    categoryVariant: 'destructive' | 'secondary' | 'default';
};
