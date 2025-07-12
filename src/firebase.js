import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB0Ryzmw_PL0VLdaNh_JIt4JQ0UbdNSUt0",
  authDomain: "medimart-2c2b6.firebaseapp.com",
  projectId: "medimart-2c2b6",
  storageBucket: "medimart-2c2b6.firebasestorage.app",
  messagingSenderId: "16948562839",
  appId: "1:16948562839:web:8cd8575814199224b792d2",
  measurementId: "G-VHP3K568Y8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);