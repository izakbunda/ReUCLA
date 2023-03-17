const { database }= require('./firebase.js');
const { doc, setDoc, Timestamp, addDoc, getDoc, collection } = require('firebase/firestore');
const { auth } = require('./firebase');
const {signInWithEmailAndPassword} = require('firebase/auth');
const { exit } = require('process');

var id = 'LRNAkohn11Vrnbw8QM91';


const signIn = async => {
    signInWithEmailAndPassword(auth, 'izakbunda@ucla.edu', 'password')
        .then(userCredentials => {
            const user = userCredentials.user;
        })
};

signIn();

// aViRzNNU7oXBT5IMPGbtzc10jcN2
const test = async() =>{
    const docData = {
        gender: 1,
        bio: 2
    }

    // const collectionPath = database.collection('listings').document('clothing').get();
    const docRef = await addDoc(collection(database, '/listings/clothing/menswear'), docData);
    
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1000);

    console.log("Document written with ID: ", docRef.id);
};

test();
