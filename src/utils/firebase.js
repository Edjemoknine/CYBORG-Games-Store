// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC465voR6_MbAyOrC0z-hf0gY-mSIxcbPE",
  authDomain: "cyborg-61feb.firebaseapp.com",
  projectId: "cyborg-61feb",
  storageBucket: "cyborg-61feb.appspot.com",
  messagingSenderId: "242761544607",
  appId: "1:242761544607:web:984a290bd82c799d4683aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
