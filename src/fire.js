import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyAWK6ytB7l_vVQWRZscl4yu_qdNQTkEl80",
    authDomain: "teste01-16e6e.firebaseapp.com",
    projectId: "teste01-16e6e",
    storageBucket: "teste01-16e6e.appspot.com",
    messagingSenderId: "31935552723",
    appId: "1:31935552723:web:2ce873aa5f50af8fb74826"
};

const fire = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export { db }

export default fire