// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDJG0BBDeuTgv-VYQXnYwL4MqBVxpnTIfI",
  authDomain: "online-manga-store-92ce3.firebaseapp.com",
  projectId: "online-manga-store-92ce3",
  storageBucket: "online-manga-store-92ce3.appspot.com",
  messagingSenderId: "155420761607",
  appId: "1:155420761607:web:b4e1cc1f729d6e3e5294a2",
  measurementId: "G-NVPFD55ZMW",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
