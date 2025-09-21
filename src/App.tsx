import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useFirebaseWishlist, useFirebaseCompare } from './hooks/useFirebaseData';
import { AuthComponent } from './components/AuthComponent';
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ProductListing } from './components/ProductListing';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { TradeInFlow } from './components/TradeInFlow';
import { OrderDashboard } from './components/OrderDashboard';
import { SearchResults } from './components/SearchResults';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { WishlistPage } from './components/WishlistPage';
import { ComparePage } from './components/ComparePage';
import { CartItem, CompareItem } from './data/mockData';
import { CompareBar } from './components/CompareBar';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orderData, setOrderData] = useState<any>(null);

  // State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Auth and Data Hooks
  const { user } = useAuth();
  const { 
    wishlistItems, 
    loading: wishlistLoading, 
    addToWishlist, 
    removeFromWishlist 
  } = useFirebaseWishlist();
  
  const { 
    compareItems, 
    loading: compareLoading, 
    addToCompare, 
    removeFromCompare,
    clearCompareItems
  } = useFirebaseCompare();
  
  // Close auth modal when user logs in
  useEffect(() => {
    if (user) {
      setShowAuth(false);
    }
  }, [user]);

  const handleNavigation = (page: string, productId?: string, searchQueryParam?: string) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    } else if (page !== 'search') {
      setSearchQuery('');
    }

    // Track page view
    const analytics = require('./services/analytics').analytics;
    analytics.trackPageView(page);

    // Track search if this is a search page
    if (page === 'search' && searchQueryParam) {
      // We'll track search results count when the component mounts
      analytics.trackSearch(searchQueryParam, 0); // placeholder count
    }
  };

  const handleViewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
  };

  const handleAddToCart = (productId: string, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === productId);
      if (existingItem) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });

    // Track add to cart analytics
    const { getProductInfo } = require('./services/analytics');
    const productInfo = getProductInfo(productId);
    if (productInfo) {
      const { analytics } = require('./services/analytics');
      analytics.trackAddToCart(
        productInfo.id,
        productInfo.name,
        productInfo.category,
        productInfo.price,
        quantity
      );
    }
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    } else {
      setCartItems(prev => prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const handleToggleWishlist = async (productId: string) => {
    try {
      if (!user) {
        setShowAuth(true);
        return;
      }
      
      const isInWishlist = wishlistItems.some(item => item.productId === productId);
      if (isInWishlist) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }

      // Track wishlist analytics
      const productInfo = require('./services/analytics').getProductInfo(productId);
      if (productInfo) {
        const { analytics } = require('./services/analytics');
        analytics.trackWishlist(
          productInfo.id,
          productInfo.name,
          productInfo.category,
          productInfo.price,
          isInWishlist ? 'remove' : 'add'
        );
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const handleToggleCompare = async (productId: string) => {
    try {
      if (!user) {
        setShowAuth(true);
        return;
      }

      const isInCompare = compareItems.some(item => item.productId === productId);
      if (isInCompare) {
        await removeFromCompare(productId);
      } else {
        if (compareItems.length >= 4) {
          // Optional: Show a toast/notification that the limit is reached
          return;
        }
        await addToCompare(productId);
      }

      // Track compare analytics
      const productInfo = require('./services/analytics').getProductInfo(productId);
      if (productInfo) {
        const { analytics } = require('./services/analytics');
        analytics.trackCompare(
          productInfo.id,
          productInfo.name,
          productInfo.category,
          productInfo.price,
          isInCompare ? 'remove' : 'add'
        );
      }
    } catch (error) {
      console.error('Error toggling compare:', error);
    }
  };

  const handlePlaceOrder = (order: any) => {
    setOrderData(order);
    setCurrentPage('order-confirmation');

    // Track purchase analytics
    const { analytics } = require('./services/analytics');
    analytics.trackPurchase(
      order.orderId,
      order.total,
      order.cartItems.map((item: any) => ({ id: item.productId, quantity: item.quantity }))
    );
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigation}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onToggleCompare={handleToggleCompare}
            onViewProduct={handleViewProduct}
            wishlistItems={wishlistItems.map(item => item.productId)}
            compareItems={compareItems.map(item => item.productId)}
          />
        );

      case 'phones':
      case 'laptops':
      case 'tablets':
      case 'gaming':
      case 'accessories':
      case 'headphones':
        return (
          <ProductListing
            category={currentPage}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onToggleCompare={handleToggleCompare}
            onViewProduct={handleViewProduct}
            wishlistItems={wishlistItems.map(item => item.productId)}
            compareItems={compareItems.map(item => item.productId)}
          />
        );

      case 'search':
        return (
          <SearchResults
            searchQuery={searchQuery}
            onNavigate={handleNavigation}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onToggleCompare={handleToggleCompare}
            onViewProduct={handleViewProduct}
            wishlistItems={wishlistItems.map(item => item.productId)}
            compareItems={compareItems.map(item => item.productId)}
          />
        );

      case 'product-detail':
        return selectedProductId ? (
          <ProductDetailPage
            productId={selectedProductId}
            onNavigate={handleNavigation}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onToggleCompare={handleToggleCompare}
            onViewProduct={handleViewProduct}
            wishlistItems={wishlistItems.map(item => item.productId)}
            compareItems={compareItems.map(item => item.productId)}
          />
        ) : (
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
          </div>
        );

      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onNavigate={handleNavigation}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onToggleCompare={handleToggleCompare}
            onViewProduct={handleViewProduct}
            wishlistItems={wishlistItems.map(item => item.productId)}
            compareItems={compareItems.map(item => item.productId)}
          />
        );

      case 'checkout':
        return (
          <Checkout
            cartItems={cartItems}
            onNavigate={handleNavigation}
            onPlaceOrder={handlePlaceOrder}
          />
        );

      case 'order-confirmation':
        return orderData ? (
          <OrderConfirmation
            orderData={orderData}
            onNavigate={handleNavigation}
          />
        ) : (
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold">Order not found</h1>
          </div>
        );

      case 'trade-in':
        return <TradeInFlow onNavigate={handleNavigation} />;

      case 'orders':
        return <OrderDashboard onNavigate={handleNavigation} />;

      case 'wishlist':
        return (
          <WishlistPage
            wishlistItems={wishlistItems}
            onRemoveFromWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigation}
          />
        );

      case 'compare':
        return (
          <ComparePage
            compareItems={compareItems}
            onRemoveFromCompare={handleToggleCompare}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigation}
          />
        );

      default:
        return (
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Page Under Construction</h1>
            <p className="text-muted-foreground mb-6">
              This page is being built. Check back soon!
            </p>
            <button
              onClick={() => handleNavigation('home')}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </button>
          </div>
        );
    }
  };

  // Show loading state while initial data is loading
  if ((wishlistLoading || compareLoading) && isInitialLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Update initial load state once data is loaded
  useEffect(() => {
    if (!wishlistLoading && !compareLoading) {
      setIsInitialLoad(false);
    }
  }, [wishlistLoading, compareLoading]);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigation}
          cartItemCount={getTotalCartItems()}
          wishlistCount={wishlistItems.length}
          compareCount={compareItems.length}
        />

        <main>
          {renderCurrentPage()}
        </main>

        <Footer onNavigate={handleNavigation} />
        
        {/* Compare Bar */}
        <CompareBar
          compareItems={compareItems}
          onRemoveFromCompare={removeFromCompare}
          onNavigate={handleNavigation}
        />

        {/* Auth Modal */}
        {showAuth && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg max-w-md w-full">
              <AuthComponent onClose={() => setShowAuth(false)} />
            </div>
          </div>
        )}
      </div>
    </AuthProvider>
  );
}