// Import the functions you need from the SDKs you need
import { initializeApp ,getApps} from "firebase/app";
import { Auth } from "firebase/auth";
import { getAuth } from "firebase/auth";

import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJpk4ua92B2Cj-pqPlnmqLq_HVsosB8n0",
  authDomain: "fire-homes-course-8ca9e.firebaseapp.com",
  projectId: "fire-homes-course-8ca9e",
  storageBucket: "fire-homes-course-8ca9e.firebasestorage.app",
  messagingSenderId: "43081532123",
  appId: "1:43081532123:web:11faea1a3ed65464e882fe"
};


// Initialize Firebase
const currentApps = getApps();
let auth:Auth;
let storage: FirebaseStorage;
if(!currentApps.length){
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
}else{
 const app = currentApps[0];
  auth = getAuth(app);
  storage = getStorage(app);
}


export {auth,storage}
// import {auth,storage} from 'firebase/client'
