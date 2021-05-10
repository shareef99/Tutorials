import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB6jR0ZzcpeRada9MDoftgmwkgAj6GXmgQ",
    authDomain: "firegram-shareef.firebaseapp.com",
    projectId: "firegram-shareef",
    storageBucket: "firegram-shareef.appspot.com",
    messagingSenderId: "705069269174",
    appId: "1:705069269174:web:c73732f1298ab91f25e617",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
