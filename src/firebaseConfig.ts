// Import the necessary Firebase modules
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
	collection,
	CollectionReference,
	DocumentData,
	getFirestore,
	QueryDocumentSnapshot,
} from "firebase/firestore";
import { Booking } from "./types";

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

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>;
};

export const bookingsCollection = createCollection<Booking>("Bookings");
