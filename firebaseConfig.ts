"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
    FirebaseDataProvider,
    RAFirebaseOptions,
} from 'react-admin-firebase';
  

const firebaseConfig = {
    apiKey: "AIzaSyDaTb3iitvXkbQgYMOWD7lYtVY4Ot8EIM4",
    authDomain: "kmi-agdx.firebaseapp.com",
    projectId: "kmi-agdx",
    storageBucket: "kmi-agdx.firebasestorage.app",
    messagingSenderId: "875224791922",
    appId: "1:875224791922:web:4dcca1694dadef6fa1bbeb",
    measurementId: "G-2ZTKYSH3RQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const options: RAFirebaseOptions = {
    disableMeta: false,
    dontAddIdFieldToDoc: false,
    associateUsersById: false,
  };

export const firebaseDataProvider = FirebaseDataProvider(firebaseConfig, options);
