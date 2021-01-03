import firebase from 'firebase/app'
import 'firebase/auth'

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDfZ5IdLe58u74lEdTsjswaZQgqz41Q-vk',
  authDomain: 'rksk-site.firebaseapp.com',
  projectId: 'rksk-site',
  storageBucket: 'rksk-site.appspot.com',
  messagingSenderId: '746328858770',
  appId: '1:746328858770:web:7c2dffd04a99793059864b',
}

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
}

export default firebase
