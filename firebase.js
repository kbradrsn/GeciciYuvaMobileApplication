// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"; 


const firebaseConfig = {
  apiKey: "AIzaSyBXvf6R0hztc8R4I5p-db8L9nBjayMOo-I",
  authDomain: "myproject-ee023.firebaseapp.com",
  projectId: "myproject-ee023",
  storageBucket: "myproject-ee023.appspot.com",
  messagingSenderId: "886754939577",
  appId: "1:886754939577:web:39b2dc5855b83150978168",
  measurementId: "G-GJ9L53R863"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.firestore();
const storage = firebase.storage(); 

export { auth, database, storage };
