const { database }= require('./firebase.js');
const { doc, setDoc, Timestamp, addDoc, getDoc } = require('firebase/firestore');
const { auth } = require('./firebase');
const {signInWithEmailAndPassword} = require('firebase/auth');
const { exit } = require('process');

var id = 'LRNAkohn11Vrnbw8QM91';


// const signIn = async => {
//     signInWithEmailAndPassword(auth, 'izakbunda@ucla.edu', 'password')
//         .then(userCredentials => {
//             const user = userCredentials.user;
//             console.log(user.uid);
//         })
// };

// signIn();

// aViRzNNU7oXBT5IMPGbtzc10jcN2

const tests = { userID : "aViRzNNU7oXBT5IMPGbtzc10jcN2"}

async function test(){
    var uid = tests.userID;
    const j = JSON.stringify(uid);
    const p = j.replace('\"', '');
    const docRef = doc(database, 'userData', p);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
        console.log("Doc Data: ", docSnap.data());
    }
    else{
        console.log("Doesn't Exist");
        exit(1);
    }
}

test();