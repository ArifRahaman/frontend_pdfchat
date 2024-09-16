// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdaZrIeyWSl1is9KfXYMwajaQXr3KpFHs",
  authDomain: "fir-39b86.firebaseapp.com",
  databaseURL: "https://fir-39b86-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-39b86",
  storageBucket: "fir-39b86.appspot.com",
  messagingSenderId: "224166242321",
  appId: "1:224166242321:web:a5ba7dc587e9ddb41069b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;