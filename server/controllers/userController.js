const admin = require("firebase-admin");
const { database } = require("../firebase.js");
const { FieldValue } = require("@google-cloud/firestore");
const { auth } = require("../firebase");
const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} = require("firebase/auth");
const { firestore } = require("firebase-admin");
const {
    doc,
    setDoc,
    Timestamp,
    addDoc,
    getDoc,
    updateDoc,
} = require("firebase/firestore");
// const { isErrored } = require("stream");

const createUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    var user, userID, docRef;
    // console.log(req.body)
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            user = userCredentials.user;
            const uID = JSON.stringify(user.uid);

            userID = uID.replace('"', "");
            userID = user.uid;
            console.log(userID);

            docRef = doc(database, "userData", userID);
            const docData = {
                firstName: first_name,
                lastName: last_name,
            };
            setDoc(docRef, docData);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    // console.log("User Exists");
                    user = userCredentials.user;
                    userID = user.uid;
                    userExists = true;
                }) // Send's an error back if this log-in isn't complete
                .catch((err) => {
                    console.log(err);
                    res.send(err);
                });
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2500);

    if (!userExists) return;
    // Retrieves User Data
    onAuthStateChanged(auth, (user) => {
        userID = user.uid;
    });
    console.log(userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Doc Data: ", docSnap.data());
        userData = docSnap.data();
        res.send({ userID, userData });
    } else {
        console.log("Doc Data doesn't Exist");
        res.send({ errCode: 1, error: "Doesn't Exist" });
    }
};

const updateUser = async (req, res) => {
    // const tempID = req.body.uID;
    const userID = req.body.uID;
    console.log(req.body.uID);
    docRef = doc(database, "userData", req.body.uID);

    const tempPath = req.body.pfpPath;
    console.log(tempPath);
    var path = "/";
    if (tempPath) {
        const lastIndex = tempPath.lastIndexOf("/");
        path = tempPath.substring(lastIndex + 1);
    }

    const docData = {
        major: req.body.major,
        bio: req.body.bio,
        contact: [req.body.instagram, req.body.discord, req.body.twitter],
        pfpPath: path,
        signInPath: tempPath,
        userListings: [],
    };

    // {major: , bio:, contact: {instagram: , discord: ,twitter:}}

    await updateDoc(docRef, docData);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Doc Data: ", docSnap.data());
        const userData = docSnap.data();
        res.send({ userData, userID });
    } else {
        console.log("Doc Data doesn't Exist");
        res.send({ errCode: 1, error: "Doesn't Exist" });
    }
};

const signIn = async (req, res) => {
    // console.log("attempting to signin");

    // Variables used later
    const email = req.body.email;

    const password = req.body.password;
    var user, userData, docRef, docRef, userID;
    var userExists = false;

    // Tries to Sign in with firebase authentification
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            console.log("User Exists");
            user = userCredentials.user;
            userID = user.uid;
            userExists = true;
            docRef = doc(database, "userData", userID);
            docRef = doc(database, "userData", userID);
        }) // Send's an error back if this log-in isn't complete
        .catch((err) => {
            console.log(err);
            res.send(err);
        });

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1500);

    if (!userExists) return;
    // Retrieves User Data
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Doc Data: ", docSnap.data());
        userData = docSnap.data();
        res.send({ userID, userData });
    } else {
        console.log("Doc Data doesn't Exist");
        res.send({ errCode: 1, error: "Doesn't Exist" });
    }
};

const getUser = async (req, res) => {
    // const userID = req.body.userID;
    // const docRef = doc(database, 'userData', userID);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()){
    //     console.log("existing data");
    //     const docData = docSnap.data()
    //     res.send({ userID, docData })
    // }
    // else{
    //     console.log("No user data");
    //     res.send({errCode: 1 , error: "Doesn't Exist"});
    // }
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    signIn,
};
