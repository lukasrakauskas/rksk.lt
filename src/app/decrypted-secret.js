import crypto from 'crypto';

import { encrypted } from './firebase-secret.enc';

const algorithm = 'aes-128-cbc';
const decipher = crypto.createDecipheriv(
  algorithm,
  process.env.FIREBASE_ENCRYPTION_KEY,
  process.env.FIREBASE_ENCRYPTION_IV
);

export const getDecryptedSecret = () => {
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');

  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
};
