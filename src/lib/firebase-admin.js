import admin from 'firebase-admin';

import { getDecryptedSecret } from 'src/app/decrypted-secret';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(getDecryptedSecret()),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

export default admin;
