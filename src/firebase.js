import firebase from 'firebase/app';// rollup bundle issue with ESM import
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
  apiKey: "AIzaSyBP03CMbS8ao3hgT0kqCoLTRAYnqN1NPzk",
  authDomain: "realtime-todos-a774d.firebaseapp.com",
  databaseURL: "https://realtime-todos-a774d.firebaseio.com",
  projectId: "realtime-todos-a774d",
  storageBucket: "realtime-todos-a774d.appspot.com",
  messagingSenderId: "628602828340",
  appId: "1:628602828340:web:1cfcf8336177646af03c61",
  measurementId: "G-BGVLDJZ8XT"
};

console.log(firebase)

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();


