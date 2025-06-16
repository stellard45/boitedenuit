export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    musicGenres: string[];
    budget: 'low' | 'medium' | 'high';
    neighborhoods: string[];
  };
  stats: {
    eventsAttended: number;
    loyaltyPoints: number;
    vipStatus: boolean;
  };
}

export interface Club {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceRange: '$' | '$$' | '$$$';
  musicGenres: string[];
  dressCode: string;
  features: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Event {
  id: string;
  title: string;
  club: Club;
  date: string;
  time: string;
  image: string;
  description: string;
  dj: string;
  musicGenre: string;
  price: {
    regular: number;
    vip: number;
    guestList: number;
  };
  capacity: number;
  attendees: number;
  isGuestListAvailable: boolean;
  isVipAvailable: boolean;
  tags: string[];
}

export interface Booking {
  id: string;
  event: Event;
  user: User;
  type: 'regular' | 'vip' | 'guestList';
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  qrCode: string;
  createdAt: string;
  totalPrice: number;
}

export interface Review {
  id: string;
  user: User;
  club: Club;
  event?: Event;
  rating: number;
  comment: string;
  date: string;
  photos?: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'location';
}

export interface Recommendation {
  id: string;
  event: Event;
  score: number;
  reasons: string[];
  type: 'personalized' | 'trending' | 'nearby' | 'similar';
}