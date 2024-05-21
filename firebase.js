// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJEJ9ORDnuR_kHVk1si1Y6A0ecg5Xh25Q",
  authDomain: "singles-inferno-1da30.firebaseapp.com",
  projectId: "singles-inferno-1da30",
  storageBucket: "singles-inferno-1da30.appspot.com",
  messagingSenderId: "971447917612",
  appId: "1:971447917612:web:783162d40634de31654589",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
