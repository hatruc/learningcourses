import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBjn_TK7U9RUaCcdeAoMA9xaqFsxM1CQD4",
    authDomain: "project3-e9624.firebaseapp.com",
    projectId: "project3-e9624",
    storageBucket: "project3-e9624.appspot.com",
    messagingSenderId: "60616470964",
    appId: "1:60616470964:web:b7a6ff3f121c077fa042e1",
    measurementId: "G-LY13CQ4H93"
};

firebase.initializeApp(firebaseConfig);

export default firebase;