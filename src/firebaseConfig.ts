// Import the necessary Firebase modules
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config here
const firebaseConfig = {
	apiKey: "AIzaSyCWrYpxFMRGxXsAjhTJmzHHBPltdbwuPZc",
	authDomain: "",
	projectId: "parking-app-fdfc1",
	storageBucket: "",
	messagingSenderId: "1091965144175",
	appId: "1091965144175",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
