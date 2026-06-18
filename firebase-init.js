// ============================================================
// FIREBASE INITIALIZATION
// ============================================================
// Step 1: console.firebase.google.com par jaake naya project banaye (free)
// Step 2: Project Settings > General > "Add app" > Web (</>) icon select kare
// Step 3: Jo config object milega, neeche firebaseConfig mein paste kar de
// Step 4: Build section mein jaake "Firestore Database" enable kare (test mode mein start kare)
//
// NOTE: Images Cloudinary (free, no card needed) ke through upload hoti hain,
// isliye Firebase Storage enable karne ki zaroorat NAHI hai. Cloudinary setup
// CLOUDINARY-SETUP.md file mein hai.
//
// Jab tak aap apna config nahi daalenge, ye file kaam nahi karegi aur
// site apne purane static (hardcoded) content ke saath chalti rahegi -
// koi error nahi aayega, blog/admin features simply inactive rahenge.
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 👇👇👇 YAHAN APNA FIREBASE CONFIG PASTE KARE 👇👇👇
const firebaseConfig = {
  apiKey: "AIzaSyDg14kw-6KQKzBVNux7dtjUGPSvJTvbwBE",
  authDomain: "prashant-portfolio-2be1f.firebaseapp.com",
  projectId: "prashant-portfolio-2be1f",
  storageBucket: "prashant-portfolio-2be1f.firebasestorage.app",
  messagingSenderId: "326829758199",
  appId: "1:326829758199:web:648dc5e7359c605e11a5f2",
  measurementId: "G-RNKPKLTRZ3"
};
// 👆👆👆 YAHAN APNA FIREBASE CONFIG PASTE KARE 👆👆👆

// Detect whether the placeholder config was replaced
export const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

let app, db, auth;

if (isFirebaseConfigured) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
} else {
    console.warn(
        "[Firebase] Config placeholder detected. Blog/Admin features are disabled until you add your real Firebase config in firebase-init.js."
    );
}

export {
    app, db, auth,
    collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, orderBy, serverTimestamp,
    signInWithEmailAndPassword, onAuthStateChanged, signOut
};