// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJEJ9ORDnuR_kHVk1si1Y6A0ecg5Xh25Q",
  authDomain: "singles-inferno-1da30.firebaseapp.com",
  databaseURL: "https://singles-inferno-1da30-default-rtdb.firebaseio.com",
  projectId: "singles-inferno-1da30",
  storageBucket: "singles-inferno-1da30.appspot.com",
  messagingSenderId: "971447917612",
  appId: "1:971447917612:web:783162d40634de31654589",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
export { app, auth, database };
