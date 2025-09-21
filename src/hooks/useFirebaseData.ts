import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { wishlistService, compareService, FirebaseWishlistItem, FirebaseCompareItem } from '../services/firestoreService';
import { WishlistItem, CompareItem } from '../data/mockData';

export function useFirebaseWishlist() {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      setWishlistItems([]);
      setLoading(false);
    }
  }, [user]);

  const loadWishlist = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const firebaseItems = await wishlistService.getWishlistItems(user.uid);
      const convertedItems: WishlistItem[] = firebaseItems.map(item => ({
        id: item.id,
        productId: item.productId,
        dateAdded: item.dateAdded.toDate().toISOString()
      }));
      setWishlistItems(convertedItems);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    if (!user) throw new Error('User must be logged in');

    try {
      const docId = await wishlistService.addToWishlist(user.uid, productId);
      await loadWishlist(); // Refresh the list

      // Analytics tracking
      const analytics = (window as any).analytics;
      if (analytics && analytics.trackWishlist) {
        const productInfo = (window as any).getProductInfo?.(productId);
        if (productInfo) {
          analytics.trackWishlist(productInfo.id, productInfo.name, productInfo.category, productInfo.price, 'add');
        }
      }

      return docId;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) throw new Error('User must be logged in');

    try {
      await wishlistService.removeFromWishlist(user.uid, productId);
      await loadWishlist(); // Refresh the list

      // Analytics tracking
      const analytics = (window as any).analytics;
      if (analytics && analytics.trackWishlist) {
        const productInfo = (window as any).getProductInfo?.(productId);
        if (productInfo) {
          analytics.trackWishlist(productInfo.id, productInfo.name, productInfo.category, productInfo.price, 'remove');
        }
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  };

  return {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    refreshWishlist: loadWishlist
  };
}

export function useFirebaseCompare() {
  const { user } = useAuth();
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCompareItems();
    } else {
      setCompareItems([]);
      setLoading(false);
    }
  }, [user]);

  const loadCompareItems = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const firebaseItems = await compareService.getCompareItems(user.uid);
      const convertedItems: CompareItem[] = firebaseItems.map(item => ({
        id: item.id,
        productId: item.productId
      }));
      setCompareItems(convertedItems);
    } catch (error) {
      console.error('Error loading compare items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCompare = async (productId: string) => {
    if (!user) throw new Error('User must be logged in');

    try {
      // Check if already exists and limit to 4 items
      const existingItem = compareItems.find(item => item.productId === productId);
      if (existingItem) {
        await removeFromCompare(productId);
        return;
      }

      if (compareItems.length >= 4) {
        throw new Error('Maximum 4 items allowed for comparison');
      }

      const docId = await compareService.addToCompare(user.uid, productId);
      await loadCompareItems(); // Refresh the list

      // Analytics tracking
      const analytics = (window as any).analytics;
      if (analytics && analytics.trackCompare) {
        const productInfo = (window as any).getProductInfo?.(productId);
        if (productInfo) {
          analytics.trackCompare(productInfo.id, productInfo.name, productInfo.category, productInfo.price, 'add');
        }
      }

      return docId;
    } catch (error) {
      console.error('Error adding to compare:', error);
      throw error;
    }
  };

  const removeFromCompare = async (productId: string) => {
    if (!user) throw new Error('User must be logged in');

    try {
      await compareService.removeFromCompare(user.uid, productId);
      await loadCompareItems(); // Refresh the list

      // Analytics tracking
      const analytics = (window as any).analytics;
      if (analytics && analytics.trackCompare) {
        const productInfo = (window as any).getProductInfo?.(productId);
        if (productInfo) {
          analytics.trackCompare(productInfo.id, productInfo.name, productInfo.category, productInfo.price, 'remove');
        }
      }
    } catch (error) {
      console.error('Error removing from compare:', error);
      throw error;
    }
  };

  const clearCompareItems = async () => {
    if (!user) throw new Error('User must be logged in');

    try {
      await compareService.clearCompareItems(user.uid);
      setCompareItems([]);
    } catch (error) {
      console.error('Error clearing compare items:', error);
      throw error;
    }
  };

  return {
    compareItems,
    loading,
    addToCompare,
    removeFromCompare,
    clearCompareItems,
    refreshCompareItems: loadCompareItems
  };
}
