// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth")
const admin = require("firebase-admin");
const serviceAccount = require("./.firebase/service_account.json");

//TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgeS8HmRPGFhST45_3f_ogl-Z0Maxyue0",
  authDomain: "reucla.firebaseapp.com",
  projectId: "reucla",
  storageBucket: "reucla.appspot.com",
  messagingSenderId: "971693490115",
  appId: "1:971693490115:web:4af2ce431454564e958776"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = getAuth();
const database = admin.fireStore;

module.exports = {
    auth,
    database
}