import admin from 'firebase-admin'

const serviceAccount = require('../firebase-admin.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      'https://rksk-site-default-rtdb.europe-west1.firebasedatabase.app',
  })
}

export default admin.database()
