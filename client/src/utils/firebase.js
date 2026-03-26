
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "aimock-698ff.firebaseapp.com",
  projectId: "aimock-698ff",
  storageBucket: "aimock-698ff.firebasestorage.app",
  messagingSenderId: "329929405843",
  appId: "1:329929405843:web:6092f2c7c451a58630e466"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}