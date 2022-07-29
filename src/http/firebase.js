import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHV8aVSIzguDRJN9MUmfFY_fUIEtMx744",
  authDomain: "takeru-9a7f4.firebaseapp.com",
  projectId: "takeru-9a7f4",
  storageBucket: "takeru-9a7f4.appspot.com",
  messagingSenderId: "134289047628",
  appId: "1:134289047628:web:b5d25497c105581aabb4e9",
  measurementId: "G-7890QBWNWC",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
