const admin = require('firebase-admin')
const { database }= require('../firebase.js')
const { FieldValue }=require('@google-cloud/firestore')
const { auth } = require("../firebase")
const { createUserWithEmailAndPassword } = require('firebase/auth')
const { appendFile } = require('fs')


const createUser = async(req, res)=>{
    email = req.body.email
    password = req.body.password
    firstName = req.body.firstName
    lastName = req.body.lastName
    console.log(req.body)
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Created user with username " + user.uid)
        });
    
    res.send( { uid } )
}


// username = datapacket.username;
//   password = datapacket.username;
//   createUserWithEmailAndPassword(auth, username, password)
//     .then(userCredentials => {
//       const user = userCredentials.user;
//       console.log("Created user with username ", user.username)
//     });
//   res.send({username, password})

const readUser = async(req, res)=>{
     
}

const updateUser = async(req, res)=>{

}

const deleteUser = async(req, res)=>{

}

module.exports={
    createUser,
    readUser,
    updateUser,
    deleteUser
}