const admin = require('firebase-admin');

// Initialize Firebase Admin with service account
const serviceAccount = require('./serviceAccountKey.json'); // You'll need to create this file

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://kbz-computers.firebaseio.com',
  storageBucket: 'kbz-computers.firebasestorage.app'
});

// Get references to the services
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

// Enable offline data persistence for Firestore
// db.settings({ ignoreUndefinedProperties: true });

module.exports = {
  admin,
  db,
  auth,
  storage
};
