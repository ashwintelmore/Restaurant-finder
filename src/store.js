
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose } from 'redux'
import {firebaseReducer} from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import { composeWithDevTools } from 'redux-devtools-extension'
const fbConfig = {
    apiKey: process.env.REACT_APP_FIREBESE_API_KEY,
    authDomain: process.env. REACT_APP_FIREBESE_AUTH_DOMAIN,
    projectId: process.env. REACT_APP_FIREBESE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBESE_STORAGE_BUCKET ,
    messagingSenderId:process.env. REACT_APP_FIREBESE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBESE_APP_ID
}
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

export const app = firebase.initializeApp(fbConfig)

firebase.firestore() // <- needed if using firestore

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// const initialState = {}
const store = createStore(rootReducer , composeWithDevTools())

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

export default store;