const admin = require('firebase-admin')
const { database }= require('../firebase.js')
const { FieldValue }=require('@google-cloud/firestore')
const { auth } = require("../firebase")
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth')
const { firestore } = require('firebase-admin')
const { doc, setDoc, Timestamp, addDoc, getDoc } = require('firebase/firestore')


const createListing = async(req, res) => {

}



module.exports = {
    createListing
}