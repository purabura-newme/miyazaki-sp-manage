"use client";

import { FirebaseAuth, FirestoreDatabase, initializeFirebase } from "refine-firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDaTb3iitvXkbQgYMOWD7lYtVY4Ot8EIM4",
    authDomain: "kmi-agdx.firebaseapp.com",
    projectId: "kmi-agdx",
    storageBucket: "kmi-agdx.firebasestorage.app",
    messagingSenderId: "875224791922",
    appId: "1:875224791922:web:4dcca1694dadef6fa1bbeb",
    measurementId: "G-2ZTKYSH3RQ"
};

export const firebaseApp = initializeFirebase(firebaseConfig);
export const firebaseAuth = new FirebaseAuth();
export const firebaseAuthProvider = firebaseAuth.getAuthProvider();
export const firestoreDatabase = new FirestoreDatabase();
export const firestoreDataProvider = firestoreDatabase.getDataProvider();
export const firebaseAuthHandleLogout = firebaseAuth.handleLogOut();
