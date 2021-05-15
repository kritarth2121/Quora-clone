// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDM11HhaSZDM1Hk3gdetYgN0Jkzq5x_3q0",
  authDomain: "quora-for-college-24095.firebaseapp.com",
  projectId: "quora-for-college-24095",
  storageBucket: "quora-for-college-24095.appspot.com",
  messagingSenderId: "1094611885495",
  appId: "1:1094611885495:web:02d7d19d8b36ea30421c32",
  measurementId: "G-5NWJR7312T",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;