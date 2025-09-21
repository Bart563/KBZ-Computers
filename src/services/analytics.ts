// Analytics service for KBZ Computers eCommerce platform
// This can be easily extended to integrate with Google Analytics, Mixpanel, etc.

export interface AnalyticsEvent {
  event: string;
  productId?: string;
  productName?: string;
  category?: string;
  price?: number;
  quantity?: number;
  orderId?: string;
  orderValue?: number;
  searchQuery?: string;
  page?: string;
  timestamp: string;
  sessionId: string;
}

export interface ProductViewEvent extends AnalyticsEvent {
  event: 'view_product';
  productId: string;
  productName: string;
  category: string;
  price: number;
}

export interface AddToCartEvent extends AnalyticsEvent {
  event: 'add_to_cart';
  productId: string;
  productName: string;
  category: string;
  price: number;
  quantity: number;
}

export interface WishlistEvent extends AnalyticsEvent {
  event: 'wishlist_add' | 'wishlist_remove';
  productId: string;
  productName: string;
  category: string;
  price: number;
}

export interface CompareEvent extends AnalyticsEvent {
  event: 'compare_add' | 'compare_remove';
  productId: string;
  productName: string;
  category: string;
  price: number;
}

export interface PurchaseEvent extends AnalyticsEvent {
  event: 'purchase';
  orderId: string;
  orderValue: number;
  productIds: string[];
  quantities: number[];
}

export interface SearchEvent extends AnalyticsEvent {
  event: 'search';
  searchQuery: string;
  resultCount: number;
}

export interface PageViewEvent extends AnalyticsEvent {
  event: 'page_view';
  page: string;
}

class AnalyticsService {
  private sessionId: string;
  private events: AnalyticsEvent[] = [];

  constructor() {
    // Generate a unique session ID
    this.sessionId = this.generateSessionId();

    // Track initial page view
    this.trackPageView('home');

    // Listen for page navigation
    this.setupNavigationTracking();
  }

  private generateSessionId(): string {
    return `kbz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupNavigationTracking() {
    // Track page visibility changes (tab switching)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.trackPageView('foreground');
      } else {
        this.trackPageView('background');
      }
    });
  }

  // Core tracking method
  track(event: AnalyticsEvent) {
    const fullEvent: AnalyticsEvent = {
      ...event,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString()
    };

    // Add to local events array
    this.events.push(fullEvent);

    // Console log for development (can be replaced with actual analytics)
    console.log('📊 Analytics Event:', fullEvent);

    // In production, you would send to your analytics platform here
    // this.sendToAnalyticsPlatform(fullEvent);
  }

  // Page view tracking
  trackPageView(page: string) {
    this.track({
      event: 'page_view',
      page,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId
    } as PageViewEvent);
  }

  // Product view tracking
  trackProductView(productId: string, productName: string, category: string, price: number) {
    this.track({
      event: 'view_product',
      productId,
      productName,
      category,
      price
    } as ProductViewEvent);
  }

  // Add to cart tracking
  trackAddToCart(productId: string, productName: string, category: string, price: number, quantity: number = 1) {
    this.track({
      event: 'add_to_cart',
      productId,
      productName,
      category,
      price,
      quantity
    } as AddToCartEvent);
  }

  // Wishlist tracking
  trackWishlist(productId: string, productName: string, category: string, price: number, action: 'add' | 'remove' = 'add') {
    this.track({
      event: action === 'add' ? 'wishlist_add' : 'wishlist_remove',
      productId,
      productName,
      category,
      price
    } as WishlistEvent);
  }

  // Compare tracking
  trackCompare(productId: string, productName: string, category: string, price: number, action: 'add' | 'remove' = 'add') {
    this.track({
      event: action === 'add' ? 'compare_add' : 'compare_remove',
      productId,
      productName,
      category,
      price
    } as CompareEvent);
  }

  // Purchase tracking
  trackPurchase(orderId: string, orderValue: number, products: Array<{id: string, quantity: number}>) {
    this.track({
      event: 'purchase',
      orderId,
      orderValue,
      productIds: products.map(p => p.id),
      quantities: products.map(p => p.quantity)
    } as PurchaseEvent);
  }

  // Search tracking
  trackSearch(searchQuery: string, resultCount: number) {
    this.track({
      event: 'search',
      searchQuery,
      resultCount
    } as SearchEvent);
  }

  // Get all tracked events (for debugging)
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  // Clear events (useful for testing)
  clearEvents() {
    this.events = [];
  }

  // Export events as JSON
  exportEvents(): string {
    return JSON.stringify(this.events, null, 2);
  }

  // Send to analytics platform (placeholder for future integration)
  private sendToAnalyticsPlatform(event: AnalyticsEvent) {
    // This is where you would integrate with:
    // - Google Analytics 4 (gtag)
    // - Mixpanel (mixpanel.track)
    // - Segment (analytics.track)
    // - Custom analytics endpoint

    // Example Google Analytics 4 integration:
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', event.event, {
    //     product_id: event.productId,
    //     product_name: event.productName,
    //     category: event.category,
    //     value: event.price,
    //     currency: 'GHS'
    //   });
    // }
  }
}

// Create singleton instance
export const analytics = new AnalyticsService();

// Helper function to get product info for tracking
export const getProductInfo = (productId: string) => {
  const { mockProducts } = require('../data/mockData');
  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    console.warn(`Product not found for analytics tracking: ${productId}`);
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price
  };
};
