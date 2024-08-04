// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrKGMcpQ6MNMltbLqf7-uxtDO2Mcmu-tI",
  authDomain: "react-cursos-e1650.firebaseapp.com",
  projectId: "react-cursos-e1650",
  storageBucket: "react-cursos-e1650.appspot.com",
  messagingSenderId: "111946040288",
  appId: "1:111946040288:web:b1b6d0b7a234def0c5e185"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseBD = getFirestore( FirebaseApp );