const admin = require('firebase-admin')
const { database }= require('../firebase.js')
const { FieldValue }=require('@google-cloud/firestore')
const { auth } = require("../firebase")
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth')
const { firestore } = require('firebase-admin')
const { doc, setDoc, Timestamp, addDoc, getDoc } = require('firebase/firestore')
const { isErrored } = require('stream')

const createUser = async(req, res)=>{
    const email = req.body.email; const password = req.body.password;
    const first_name = JSON.stringify(req.body.first_name); const last_name = req.body.last_name;
    var user;
    // console.log(req.body)
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            user = userCredentials.user;
            const userID = JSON.stringify(user.uid)
            console.log("Created user with username " + user.uid);
            const docRef = doc(database, 'userData', userID);
            const docData = {
                firstName : first_name,
                lastName : last_name
            };
            setDoc(docRef, docData);
            res.send({ userID });
        })
        .catch(err =>{
            console.log(err);
            res.send(err)
        })
}

const updateUser = async(req, res)=>{

}

const signIn = async(req, res) => {
    // Variables used later
    const email = req.body.email; const password = req.body.password
    var user, docRef, userID, userData;

    // Tries to Sign in with firebase authentification
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials =>{
            user = userCredentials.user;
            userID = JSON.stringify(user.uid);
            // Retrieving the Document
            docRef = doc(database, 'userData', userID);
        }) // Send's an error back if this log-in isn't complete
        .catch(err => {
            console.log(err);
            res.send(err);
        });
    
    // Retrieves User Data
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
        console.log("Doc Data: ", docSnap.data());
    } else{
        console.log("Doc Data doesn't Exist")
        res.send({errCode: 1, error: "Doesn't Exist"})
    }

    // Returns User Data along with their userID Hash
    userData = docSnap.data()
    res.send( { userID, userData } )
}

const getUser = async(req, res) => {
    const userID = req.body.userID;
    const docRef = doc(database, 'userData', userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
        console.log("existing data");
        const docData = docSnap.data()
        res.send({ userID, docData })
    }
    else{
        console.log("No user data");
        res.send({errCode: 1 , error: "Doesn't Exist"});
    }
}

module.exports={
    createUser,
    getUser,
    updateUser,
    signIn
}