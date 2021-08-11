import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyABh6YJLWGKacNAwdQAZiCbCC_nzIfUBXE",
    authDomain: "learning-react-pdf-viewer.firebaseapp.com",
    projectId: "learning-react-pdf-viewer",
    storageBucket: "learning-react-pdf-viewer.appspot.com",
    messagingSenderId: "313644958205",
    appId: "1:313644958205:web:8c6cda39e1724855e85994",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
