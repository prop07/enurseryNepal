import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCbhXJ2V2FCeinH4xpWc_ajzv0th8s0OWQ",
  authDomain: "enurserynepal-356e0.firebaseapp.com",
  projectId: "enurserynepal-356e0",
  storageBucket: "enurserynepal-356e0.appspot.com",
  messagingSenderId: "87470534910",
  appId: "1:87470534910:web:595ad01c78419c61aef5af",
  measurementId: "G-SSDHGLXMGS"
};

const  app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app);



