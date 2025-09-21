# 🚀 KBZ Computers Backend Setup Guide

## 📋 Overview

This project now includes both **Firebase** (for quick setup) and **Node.js/Express** (for advanced features) backends for the Wishlist & Compare functionality.

## 🎯 Features Implemented

### ✅ **Firebase Backend (Quick Setup)**
- 🔐 **User Authentication** - Email/password and Google sign-in
- 🗄️ **Data Persistence** - Wishlist and compare items saved to Firestore
- 📊 **Analytics** - User behavior tracking
- 🔔 **Notification Ready** - Structure for price alerts

### ✅ **Node.js Backend (Advanced Features)**
- 📡 **REST API** - Full CRUD operations for wishlist/compare
- 📈 **Analytics API** - Popular products and conversion tracking
- 🔔 **Email Notifications** - Price drop alerts via Nodemailer
- 🔧 **Price Tracking** - Monitor price changes (structure ready)

---

## 🛠️ **Setup Instructions**

### **Step 1: Firebase Setup (REQUIRED)**

1. **Create Firebase Project**
   ```bash
   # Go to https://console.firebase.google.com/
   # Create new project: "kbz-ecommerce" (or your preferred name)
   ```

2. **Enable Authentication**
   ```bash
   # In Firebase Console → Authentication → Sign-in method
   # Enable: Email/Password and Google
   ```

3. **Enable Firestore Database**
   ```bash
   # In Firebase Console → Firestore Database
   # Create database in production mode
   # Set up security rules (start in test mode for development)
   ```

4. **Get Firebase Config**
   ```bash
   # In Firebase Console → Project Settings → General
   # Scroll to "Your apps" section
   # Click "Web app" icon to create config
   ```

5. **Update Firebase Configuration**
   ```typescript
   // In src/services/firebase.ts
   // Replace the placeholder values with your actual Firebase config
   const firebaseConfig = {
     apiKey: "your-actual-api-key",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-actual-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id",
     measurementId: "your-measurement-id"
   };
   ```

### **Step 2: Node.js Backend Setup (OPTIONAL - For Advanced Features)**

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Set up Firebase Admin**
   ```bash
   # Download service account key from Firebase Console
   # Project Settings → Service accounts → Generate private key
   # Save as: backend/firebase-service-account.json
   ```

3. **Configure Environment**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Start Backend Server**
   ```bash
   cd backend
   npm run dev  # For development with auto-reload
   # or
   npm start    # For production
   ```

---

## 🎮 **Testing the Integration**

### **1. Test Authentication**
```bash
# 1. Open your app in browser
# 2. Try to add item to wishlist
# 3. Should see login prompt
# 4. Sign in with email or Google
# 5. Items should persist after refresh
```

### **2. Test API Endpoints**
```bash
# Test wishlist API (replace with your user ID)
curl http://localhost:3001/api/wishlist/your-user-id

# Test compare API
curl http://localhost:3001/api/compare/your-user-id

# Test analytics
curl http://localhost:3001/api/analytics/wishlist-popular
```

### **3. Test Persistence**
```bash
# 1. Add items to wishlist while logged in
# 2. Close browser completely
# 3. Reopen and sign in
# 4. Items should still be there!
```

---

## 📊 **Database Structure**

### **Firestore Collections:**
- `wishlist` - User wishlist items
- `compare` - User comparison items
- `priceAlerts` - Price drop notifications
- `analytics` - User behavior tracking

### **API Endpoints:**
- `GET /api/wishlist/:userId` - Get user's wishlist
- `POST /api/wishlist/:userId/add/:productId` - Add to wishlist
- `DELETE /api/wishlist/:userId/remove/:productId` - Remove from wishlist
- `GET /api/compare/:userId` - Get comparison items
- `POST /api/compare/:userId/add/:productId` - Add to compare
- `POST /api/price-alerts/:userId/create` - Create price alert

---

## 🚀 **Deployment Options**

### **Option A: Firebase Only (Recommended for Start)**
- Deploy frontend to Netlify/Vercel
- Use Firebase for backend (free tier available)
- No server management needed

### **Option B: Full Node.js Backend**
- Deploy backend to Heroku/Railway
- Connect frontend to your API
- More control and customization

### **Option C: Hybrid Approach**
- Use Firebase for auth and database
- Use Node.js for complex operations
- Best of both worlds

---

## 🔧 **Firebase Security Rules**

For production, update Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /wishlist/{document} {
      allow read, write: if request.auth != null &&
        request.auth.uid == resource.data.userId;
    }
    match /compare/{document} {
      allow read, write: if request.auth != null &&
        request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## 🎉 **You're All Set!**

Your KBZ Computers platform now has:
- ✅ **Persistent user accounts**
- ✅ **Saved wishlist items**
- ✅ **Cross-device sync**
- ✅ **Real data persistence**
- ✅ **Analytics tracking**
- ✅ **Notification structure**

**Next Steps:**
1. Set up your Firebase project
2. Test the authentication flow
3. Deploy your enhanced platform!

**Questions?** Check the troubleshooting section or ask for help! 🚀
