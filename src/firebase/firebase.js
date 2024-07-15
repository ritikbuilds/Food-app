import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {firebaseApi} from "../constants"

const firebaseConfig = {
  apiKey: firebaseApi,
  authDomain: "food-app-eebc2.firebaseapp.com",
  projectId: "food-app-eebc2",
  storageBucket: "food-app-eebc2.appspot.com",
  messagingSenderId: "19026587242",
  appId: "1:19026587242:web:b46ef9f28ab35a9c7ae413",
  measurementId: "G-E8DE31ZQR0",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
