// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCI6hU1QoIwqPmaURWPEd4tnznXVY-e9dU",
  authDomain: "quoraclone-d9002.firebaseapp.com",
  projectId: "quoraclone-d9002",
  storageBucket: "quoraclone-d9002.appspot.com",
  messagingSenderId: "722018230631",
  appId: "1:722018230631:web:69db746343df36967a4fc2",
  measurementId: "G-VV9GLJFN31"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const pr = new firebase.auth.FacebookAuthProvider();

const db = firebaseApp.firestore();

export { auth, provider,pr };
export default db;