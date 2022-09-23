import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA72qFbAyghA0_EKMjJC8I9Lsxjlv5SHcM",
  authDomain: "user-services-90768.firebaseapp.com",
  projectId: "user-services-90768",
  storageBucket: "user-services-90768.appspot.com",
  messagingSenderId: "625346928724",
  appId: "1:625346928724:web:9a47d874258186815dcdc1",
  measurementId: "G-3EQ33B8LH1",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
