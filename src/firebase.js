import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore' 

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBESE_API_KEY,
    authDomain: process.env. REACT_APP_FIREBESE_AUTH_DOMAIN,
    projectId: process.env. REACT_APP_FIREBESE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBESE_STORAGE_BUCKET ,
    messagingSenderId:process.env. REACT_APP_FIREBESE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBESE_APP_ID
  };

firebase.firestore() // <- needed if using firestore

  // Initialize Firebase
  export const app = firebase.initializeApp(firebaseConfig);