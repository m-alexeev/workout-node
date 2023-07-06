import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence  } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FIREBASE_DOMAIN,
  FIREBASE_DB_URL,
  FIREBASE_PROJ_ID,
  FIREBASE_MEASURE_ID,
  FIREBASE_APP_ID,
  FIREBASE_MESSAGING_ID,
  FIREBASE_API_KEY,
  FIREBASE_STORAGE_BUCKET
} from "@env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_DOMAIN,
  databaseURL:FIREBASE_DB_URL,
  projectId: FIREBASE_PROJ_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASURE_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const myReactNativeLocalPersistence =
  getReactNativePersistence({
    getItem(...args) {
      // Called inline to avoid deprecation warnings on startup.
      return AsyncStorage.getItem(...args);
    },
    setItem(...args) {
      // Called inline to avoid deprecation warnings on startup.
      return AsyncStorage.setItem(...args);
    },
    removeItem(...args) {
      // Called inline to avoid deprecation warnings on startup.
      return AsyncStorage.removeItem(...args);
    },
  });

// keep data persistence between reloads
initializeAuth(app, { persistence: myReactNativeLocalPersistence });
const auth = getAuth(app);
const db = getFirestore(app);

export { app, db, auth };
