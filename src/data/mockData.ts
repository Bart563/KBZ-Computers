// Mock data for the KBZ Computers eCommerce application

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface WishlistItem {
  id: string;
  productId: string;
  dateAdded: string;
}

export interface CompareItem {
  id: string;
  productId: string;
}


export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  discount?: number;
  badge?: string;
  category: string;
  brand: string;
  inStock: boolean;
  stockCount: number;
  specifications: Record<string, string>;
  description: string;
  images: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedSpecs?: Record<string, string>;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export const mockProducts: Product[] = [
  // Phones
  {
    id: 'phone-1',
    name: 'iPhone 15 Pro Max',
    price: 12990,
    originalPrice: 13990,
    image: 'https://images.unsplash.com/photo-1675953935267-e039f13ddd79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzU4Mzk4ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviewCount: 234,
    discount: 7,
    badge: 'Best Seller',
    category: 'phones',
    brand: 'Apple',
    inStock: true,
    stockCount: 15,
    specifications: {
      'Display': '6.7" Super Retina XDR',
      'Processor': 'A17 Pro Chip',
      'Storage': '256GB',
      'Camera': '48MP Triple Camera',
      'Battery': '4441 mAh'
    },
    description: 'The most advanced iPhone ever with titanium design and powerful A17 Pro chip.',
    images: ['https://images.unsplash.com/photo-1675953935267-e039f13ddd79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzU4Mzk4ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    isBestSeller: true
  },

  // Laptops
  {
    id: 'laptop-1',
    name: 'Gaming Laptop RTX 4080',
    price: 28500,
    originalPrice: 32000,
    image: 'https://images.unsplash.com/photo-1620705914357-a9d11009e068?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzU4Mzk4ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviewCount: 89,
    discount: 11,
    badge: 'Gaming Beast',
    category: 'laptops',
    brand: 'ASUS ROG',
    inStock: true,
    stockCount: 8,
    specifications: {
      'Display': '15.6" 240Hz QHD',
      'Processor': 'Intel i9-13900H',
      'Graphics': 'RTX 4080 12GB',
      'RAM': '32GB DDR5',
      'Storage': '1TB SSD'
    },
    description: 'Ultimate gaming performance with RTX 4080 graphics and lightning-fast display.',
    images: ['https://images.unsplash.com/photo-1620705914357-a9d11009e068?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzU4Mzk4ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    isTrending: true
  },

  // Gaming
  {
    id: 'gaming-1', 
    name: 'PlayStation 5 Console',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1655976796204-308e6f3deaa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NTgzNTkxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviewCount: 456,
    badge: 'Hot Deal',
    category: 'gaming',
    brand: 'Sony',
    inStock: true,
    stockCount: 3,
    specifications: {
      'Storage': '825GB SSD',
      'Graphics': 'Custom RDNA 2',
      'CPU': 'AMD Zen 2',
      'Resolution': '4K Gaming',
      'Features': 'Ray Tracing, 3D Audio'
    },
    description: 'Next-generation gaming console with lightning-fast SSD and ray tracing.',
    images: ['https://images.unsplash.com/photo-1655976796204-308e6f3deaa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NTgzNTkxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    isTrending: true
  },

  // Headphones
  {
    id: 'headphones-1',
    name: 'Premium Wireless Headphones',
    price: 2990,
    originalPrice: 3990,
    image: 'https://images.unsplash.com/photo-1632200004922-bc18602c79fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBhdWRpb3xlbnwxfHx8fDE3NTg0MDA1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
    reviewCount: 178,
    discount: 25,
    badge: 'New Arrival',
    category: 'headphones',
    brand: 'Sony',
    inStock: true,
    stockCount: 25,
    specifications: {
      'Type': 'Over-ear Wireless',
      'Battery': '30 hours',
      'Connectivity': 'Bluetooth 5.2',
      'Features': 'ANC, Quick Charge',
      'Weight': '250g'
    },
    description: 'Industry-leading noise cancellation with premium sound quality.',
    images: ['https://images.unsplash.com/photo-1632200004922-bc18602c79fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBhdWRpb3xlbnwxfHx8fDE3NTg0MDA1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    isNew: true
  },

  // Tablets
  {
    id: 'tablet-1',
    name: 'iPad Pro 12.9\" M2',
    price: 11500,
    image: 'https://images.unsplash.com/photo-1630042461973-179ca2cfa7bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1ODM4MjA2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviewCount: 92,
    category: 'tablets',
    brand: 'Apple',
    inStock: true,
    stockCount: 12,
    specifications: {
      'Display': '12.9" Liquid Retina XDR',
      'Processor': 'Apple M2 Chip',
      'Storage': '256GB',
      'Camera': '12MP Wide + 10MP Ultra Wide',
      'Battery': 'Up to 10 hours'
    },
    description: 'Professional tablet with M2 chip performance and stunning display.',
    images: ['https://images.unsplash.com/photo-1630042461973-179ca2cfa7bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1ODM4MjA2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral']
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2025-001',
    date: '2025-01-15',
    status: 'delivered',
    total: 12990,
    items: [
      { productId: 'phone-1', quantity: 1, price: 12990 }
    ],
    trackingNumber: 'KBZ123456789',
    estimatedDelivery: '2025-01-18'
  },
  {
    id: 'ORD-2025-002', 
    date: '2025-01-20',
    status: 'shipped',
    total: 28500,
    items: [
      { productId: 'laptop-1', quantity: 1, price: 28500 }
    ],
    trackingNumber: 'KBZ987654321',
    estimatedDelivery: '2025-01-25'
  }
];

export const mockReviews: Review[] = [
  // Reviews for iPhone 15 Pro Max
  {
    id: 'review-1',
    productId: 'phone-1',
    userId: 'user-1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    title: 'Amazing phone, exceeded expectations!',
    comment: 'The camera quality is incredible, especially in low light. Battery life lasts all day with heavy use. The titanium build feels premium and durable. Highly recommend!',
    date: '2025-01-15',
    verified: true,
    helpful: 24,
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&h=300&fit=crop'
    ]
  },
  {
    id: 'review-2',
    productId: 'phone-1',
    userId: 'user-2',
    userName: 'Michael Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4,
    title: 'Great upgrade from iPhone 13',
    comment: 'Smooth performance and the new features are nice. The price is a bit high but you get what you pay for. Only wish the battery lasted a bit longer.',
    date: '2025-01-12',
    verified: true,
    helpful: 18
  },
  {
    id: 'review-3',
    productId: 'phone-1',
    userId: 'user-3',
    userName: 'Emily Rodriguez',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    title: 'Perfect for photography enthusiasts',
    comment: 'The Pro camera system is a game changer. Portrait mode and cinematic video are professional quality. The action button is super convenient too.',
    date: '2025-01-10',
    verified: true,
    helpful: 31
  },

  // Reviews for MacBook Pro 16
  {
    id: 'review-4',
    productId: 'laptop-1',
    userId: 'user-4',
    userName: 'David Kim',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    title: 'Best laptop for developers',
    comment: 'Incredible performance for coding and running multiple applications. The M3 Max chip handles everything I throw at it. Display is stunning for long coding sessions.',
    date: '2025-01-18',
    verified: true,
    helpful: 45,
    images: [
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300&h=300&fit=crop'
    ]
  },
  {
    id: 'review-5',
    productId: 'laptop-1',
    userId: 'user-5',
    userName: 'Lisa Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    rating: 4,
    title: 'Excellent for video editing',
    comment: 'Handles 4K video editing smoothly. The screen quality is fantastic and the speakers are surprisingly good. Only downside is the weight for travel.',
    date: '2025-01-16',
    verified: true,
    helpful: 22
  },

  // Reviews for iPad Pro
  {
    id: 'review-6',
    productId: 'tablet-1',
    userId: 'user-6',
    userName: 'Alex Rodriguez',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    title: 'Replaced my laptop for most tasks',
    comment: 'The M2 chip is incredibly powerful. I use this for everything from note-taking to photo editing. The Apple Pencil integration is seamless.',
    date: '2025-01-20',
    verified: true,
    helpful: 38
  },
  {
    id: 'review-7',
    productId: 'tablet-1',
    userId: 'user-7',
    userName: 'Jennifer Park',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    rating: 4,
    title: 'Great for students',
    comment: 'Perfect for taking notes in class and doing assignments. The battery life is amazing - lasts through multiple classes without charging.',
    date: '2025-01-19',
    verified: true,
    helpful: 15
  },

  // Reviews for AirPods Pro
  {
    id: 'review-8',
    productId: 'accessory-1',
    userId: 'user-8',
    userName: 'Robert Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    title: 'Best earbuds I\'ve ever owned',
    comment: 'The noise cancellation is incredible. Sound quality is excellent and they fit comfortably for hours. The spatial audio feature is mind-blowing.',
    date: '2025-01-22',
    verified: true,
    helpful: 52
  },
  {
    id: 'review-9',
    productId: 'accessory-1',
    userId: 'user-9',
    userName: 'Amanda Foster',
    userAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    rating: 4,
    title: 'Great for workouts',
    comment: 'Stay in place during runs and the sound quality is great. The transparency mode is useful for staying aware of surroundings. Only wish they were a bit cheaper.',
    date: '2025-01-21',
    verified: true,
    helpful: 28
  },

  // Reviews for PlayStation 5
  {
    id: 'review-10',
    productId: 'gaming-1',
    userId: 'user-10',
    userName: 'James Mitchell',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    title: 'Next-gen gaming at its finest',
    comment: 'The graphics are incredible and load times are almost non-existent. DualSense controller is revolutionary. Worth every penny for gaming enthusiasts.',
    date: '2025-01-25',
    verified: true,
    helpful: 67
  }
];

// Helper functions for reviews
export const getProductReviews = (productId: string): Review[] => {
  return mockReviews.filter(review => review.productId === productId);
};

export const getProductReviewStats = (productId: string): ReviewStats => {
  const productReviews = getProductReviews(productId);

  if (productReviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const totalReviews = productReviews.length;
  const averageRating = productReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  const ratingBreakdown = productReviews.reduce((acc, review) => {
    acc[review.rating as keyof typeof acc]++;
    return acc;
  }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  return {
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews,
    ratingBreakdown
  };
};

export const mockWishlistItems: WishlistItem[] = [
  {
    id: 'wish-1',
    productId: 'phone-1',
    dateAdded: '2025-01-15',
  },
  {
    id: 'wish-2',
    productId: 'laptop-1',
    dateAdded: '2025-01-20',
  },
];

export const mockCompareItems: CompareItem[] = [
  {
    id: 'comp-1',
    productId: 'phone-1',
  },
  {
    id: 'comp-2',
    productId: 'tablet-1',
  },
];