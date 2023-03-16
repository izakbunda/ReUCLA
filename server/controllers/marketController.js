const { database }= require('../firebase.js')
const { FieldValue }=require('@google-cloud/firestore')
const { auth } = require("../firebase")
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth')
const { firestore } = require('firebase-admin')
const { doc, setDoc, Timestamp, addDoc, getDoc, collection, updateDoc } = require('firebase/firestore')


const createListing = async(req, res) => {
    // console.log("here");
    const title = req.body.title, description = req.body.description, 
    category = req.body.category, condition = req.body.condition, 
    price = req.body.price, gender = req.body.gender,
    subcategory = req.body.subcategory, userID = req.body.uID;
    var photoPath = req.body.photoPath;

    if (photoPath){
        const lastIndex = photoPath.lastIndexOf('/');
        photoPath = photoPath.substring(lastIndex + 1); 
    } else {
        photoPath = '/';
    }

    console.log(req.body);
        
    const docData = {
        title: title, 
        description: description,
        photoPath: photoPath, 
        category: category,
        condition: condition, 
        price: price,
        gender: gender, 
        subcatgory: subcategory, 
        uID: userID
    }

    var collectionPath = '/listings';

    if (category == 'clothes'){
        if (gender == 1)
            collectionPath = collectionPath + '/clothing/menswear';
        else
            collectionPath = collectionPath + '/clothing/womenswear';
    } else {
        collectionPath = collectionPath + '/products/other';
    }

    const docRef = await addDoc(collection(database, collectionPath), docData);

    // Append data to listing
    const listID = docRef.id;
    const listPath = collectionPath + '/' + listID;
    const listRef = doc(database, collectionPath, listID);
    
    await updateDoc(listRef, {listID : listID});
    var userListings;
    const userRef = doc(database, 'userData', userID);
    const userData = await getDoc(userRef);
    if (userData.exists()){
        userListings = userData.data().userListings;
        console.log(userListings);
        userListings.push(listID);
        // console.log(userListings);
        await updateDoc(userRef, { userListings : userListings } );
    } else {
        console.log ("Why doesn't the user exist?");
    }
    var responseString = "Posted: " + title;
    res.send({response: responseString});
}

module.exports = {
    createListing
}