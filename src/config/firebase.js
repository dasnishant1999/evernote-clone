import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyANcaS-h1lhTMVhvs1l9hlXBXdKbmMp2Qs",
  authDomain: "evernote-clone-4fb91.firebaseapp.com",
  projectId: "evernote-clone-4fb91",
  storageBucket: "evernote-clone-4fb91.appspot.com",
  messagingSenderId: "345751373222",
  appId: "1:345751373222:web:b61e577cdb67003932fb67",
  measurementId: "G-6B4WTBFQ4G",
});

const db = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default firebaseApp;

export { db, timestamp, auth };
