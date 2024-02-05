import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {getAuth} from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAynhnziasID5XTdTdiERBkRVHckYQ20iM",
    authDomain: "app-pi-bbfac.firebaseapp.com",
    projectId: "app-pi-bbfac",
    storageBucket: "app-pi-bbfac.appspot.com",
    messagingSenderId: "748426994097",
    appId: "1:748426994097:web:5edfbdeafeeb3f85cddd90"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBARE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
