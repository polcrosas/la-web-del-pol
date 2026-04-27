// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC1UuBEC9f8IxUbhR9olFet4wr9AVV7xvU",
  authDomain: "mtg-data-cfc7a.firebaseapp.com",
  databaseURL: "https://mtg-data-cfc7a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mtg-data-cfc7a",
  storageBucket: "mtg-data-cfc7a.firebasestorage.app",
  messagingSenderId: "762695186251",
  appId: "1:762695186251:web:409a5d382741a3e1a75ace",
  measurementId: "G-686E241MTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
