import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { WishlistItem, CompareItem } from '../data/mockData';

export interface FirebaseWishlistItem extends Omit<WishlistItem, 'dateAdded'> {
  dateAdded: Timestamp;
  userId: string;
}

export interface FirebaseCompareItem extends CompareItem {
  userId: string;
}

// Wishlist Services
export const wishlistService = {
  async addToWishlist(userId: string, productId: string): Promise<string> {
    const docRef = await addDoc(collection(db, 'wishlist'), {
      userId,
      productId,
      dateAdded: Timestamp.now()
    });
    return docRef.id;
  },

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    const q = query(
      collection(db, 'wishlist'),
      where('userId', '==', userId),
      where('productId', '==', productId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(db, 'wishlist', document.id));
    });
  },

  async getWishlistItems(userId: string): Promise<FirebaseWishlistItem[]> {
    const q = query(
      collection(db, 'wishlist'),
      where('userId', '==', userId),
      orderBy('dateAdded', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FirebaseWishlistItem));
  }
};

// Compare Services
export const compareService = {
  async addToCompare(userId: string, productId: string): Promise<string> {
    const docRef = await addDoc(collection(db, 'compare'), {
      userId,
      productId,
      dateAdded: Timestamp.now()
    });
    return docRef.id;
  },

  async removeFromCompare(userId: string, productId: string): Promise<void> {
    const q = query(
      collection(db, 'compare'),
      where('userId', '==', userId),
      where('productId', '==', productId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(db, 'compare', document.id));
    });
  },

  async getCompareItems(userId: string): Promise<FirebaseCompareItem[]> {
    const q = query(
      collection(db, 'compare'),
      where('userId', '==', userId),
      orderBy('dateAdded', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FirebaseCompareItem));
  },

  async clearCompareItems(userId: string): Promise<void> {
    const q = query(collection(db, 'compare'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(db, 'compare', document.id));
    });
  }
};

// Price Alerts Services
export const priceAlertService = {
  async createPriceAlert(
    userId: string,
    productId: string,
    threshold: number,
    alertType: 'price_drop' | 'back_in_stock'
  ): Promise<string> {
    const docRef = await addDoc(collection(db, 'priceAlerts'), {
      userId,
      productId,
      threshold,
      alertType,
      isActive: true,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  async getPriceAlerts(userId: string) {
    const q = query(
      collection(db, 'priceAlerts'),
      where('userId', '==', userId),
      where('isActive', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};
