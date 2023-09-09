import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc , deleteDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgVAC0cK5XkVBaeP6WXEDGAzDpidlNdsc",
  authDomain: "crud-operation-2-366a5.firebaseapp.com",
  projectId: "crud-operation-2-366a5",
  storageBucket: "crud-operation-2-366a5.appspot.com",
  messagingSenderId: "251955448970",
  appId: "1:251955448970:web:fd70bf4325a8463b37b173"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
