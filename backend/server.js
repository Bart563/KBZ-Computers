import express from 'express';
import cors from 'cors';
import { db, auth } from './firebase-admin.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'KBZ Computers API is running',
    timestamp: new Date().toISOString()
  });
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.firestore();

// Email transporter for notifications
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Wishlist Routes
app.get('/api/wishlist/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlistRef = db.collection('wishlist').where('userId', '==', userId);
    const snapshot = await wishlistRef.get();

    const items = [];
    snapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/wishlist/:userId/add/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const docRef = await db.collection('wishlist').add({
      userId,
      productId,
      dateAdded: admin.firestore.FieldValue.serverTimestamp()
    });

    // Log analytics
    await db.collection('analytics').add({
      type: 'wishlist_add',
      userId,
      productId,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ id: docRef.id, message: 'Item added to wishlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/wishlist/:userId/remove/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const wishlistRef = db.collection('wishlist')
      .where('userId', '==', userId)
      .where('productId', '==', productId);

    const snapshot = await wishlistRef.get();
    const deletePromises = [];

    snapshot.forEach(doc => {
      deletePromises.push(doc.ref.delete());
    });

    await Promise.all(deletePromises);

    // Log analytics
    await db.collection('analytics').add({
      type: 'wishlist_remove',
      userId,
      productId,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Compare Routes
app.get('/api/compare/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const compareRef = db.collection('compare').where('userId', '==', userId);
    const snapshot = await compareRef.get();

    const items = [];
    snapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/compare/:userId/add/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Check if item already exists
    const existingQuery = db.collection('compare')
      .where('userId', '==', userId)
      .where('productId', '==', productId);

    const existing = await existingQuery.get();
    if (!existing.empty) {
      // Remove existing item if adding again (toggle behavior)
      const docToDelete = existing.docs[0];
      await docToDelete.ref.delete();
      return res.json({ message: 'Item removed from compare' });
    }

    // Check if user has reached limit (4 items)
    const userItemsQuery = db.collection('compare').where('userId', '==', userId);
    const userItems = await userItemsQuery.get();

    if (userItems.size >= 4) {
      return res.status(400).json({ error: 'Maximum 4 items allowed for comparison' });
    }

    const docRef = await db.collection('compare').add({
      userId,
      productId,
      dateAdded: admin.firestore.FieldValue.serverTimestamp()
    });

    // Log analytics
    await db.collection('analytics').add({
      type: 'compare_add',
      userId,
      productId,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ id: docRef.id, message: 'Item added to compare' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/compare/:userId/clear', async (req, res) => {
  try {
    const { userId } = req.params;
    const compareRef = db.collection('compare').where('userId', '==', userId);
    const snapshot = await compareRef.get();

    const deletePromises = [];
    snapshot.forEach(doc => {
      deletePromises.push(doc.ref.delete());
    });

    await Promise.all(deletePromises);
    res.json({ message: 'Compare list cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Price Alerts Routes
app.post('/api/price-alerts/:userId/create', async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, threshold, alertType } = req.body;

    const docRef = await db.collection('priceAlerts').add({
      userId,
      productId,
      threshold: parseFloat(threshold),
      alertType,
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ id: docRef.id, message: 'Price alert created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/price-alerts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const alertsRef = db.collection('priceAlerts')
      .where('userId', '==', userId)
      .where('isActive', '==', true);

    const snapshot = await alertsRef.get();
    const alerts = [];

    snapshot.forEach(doc => {
      alerts.push({ id: doc.id, ...doc.data() });
    });

    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Analytics Routes
app.get('/api/analytics/wishlist-popular', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const analyticsRef = db.collection('analytics')
      .where('type', '==', 'wishlist_add');

    const snapshot = await analyticsRef.get();
    const productCounts = {};

    snapshot.forEach(doc => {
      const productId = doc.data().productId;
      productCounts[productId] = (productCounts[productId] || 0) + 1;
    });

    const popularProducts = Object.entries(productCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, parseInt(limit))
      .map(([productId, count]) => ({ productId, count }));

    res.json(popularProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`KBZ Backend API running on port ${PORT}`);
});

module.exports = app;
