// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBjn_TK7U9RUaCcdeAoMA9xaqFsxM1CQD4",
    authDomain: "project3-e9624.firebaseapp.com",
    projectId: "project3-e9624",
    storageBucket: "project3-e9624.appspot.com",
    messagingSenderId: "60616470964",
    appId: "1:60616470964:web:b7a6ff3f121c077fa042e1",
    measurementId: "G-LY13CQ4H93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);