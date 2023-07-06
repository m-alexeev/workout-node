import { initializeApp, getFirestore } from "firebase/app";
import { getAuth, initializeAuth, reactNativeLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZu6LgcoZQTeH-bfcWwSYnfnldwq1_ueU",
  authDomain: "workout-2531c.firebaseapp.com",
  databaseURL: "https://workout-2531c-default-rtdb.firebaseio.com",
  projectId: "workout-2531c",
  storageBucket: "workout-2531c.appspot.com",
  messagingSenderId: "755490275970",
  appId: "1:755490275970:web:169571cca7fe2f6b70aa9b",
  measurementId: "G-RNXY5VSQ1W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// keep data persistence between reloads
initializeAuth(app, { persistence: reactNativeLocalPersistence });
const auth = getAuth(app);

// const db = getFirestore(app);
export {app, auth}

// export {app, db, auth};