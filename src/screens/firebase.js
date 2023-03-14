import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBgeS8HmRPGFhST45_3f_ogl-Z0Maxyue0",
    authDomain: "reucla.firebaseapp.com",
    projectId: "reucla",
    storageBucket: "reucla.appspot.com",
    messagingSenderId: "971693490115",
    appId: "1:971693490115:web:4af2ce431454564e958776",
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};