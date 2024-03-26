import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

console.log(process.env)
const firebaseConfig = {
  
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "video-d3406.firebaseapp.com",
  projectId: "video-d3406",
  storageBucket: "video-d3406.appspot.com",
  messagingSenderId: "526168366263",
  appId: "1:526168366263:web:7bae910761afb62241c132"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app;