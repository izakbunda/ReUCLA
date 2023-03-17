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
    getDoc,
    updateDoc,
    collection,
    query, 
    getDocs,
    where,
} = require("firebase/firestore");
const { list } = require("firebase/storage");

const createUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;

    var user, userID, docRef;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            user = userCredentials.user;
            const uID = JSON.stringify(user.uid);

            userID = uID.replace('"', "");
            userID = user.uid;

            docRef = doc(database, "userData", userID);
            const docData = {
                firstName: first_name,
                lastName: last_name,
            };
            setDoc(docRef, docData);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
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
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        userData = docSnap.data();
        res.send({ userID, userData });
    } else {
        res.send({ errCode: 1, error: "Doesn't Exist" });
    }
};

const updateUser = async (req, res) => {
    const userID = req.body.uID;
    docRef = doc(database, "userData", req.body.uID);

    const tempPath = req.body.pfpPath;
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

    await updateDoc(docRef, docData);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const userData = docSnap.data();
        res.send({ userData, userID });
    } else {
        res.send({ errCode: 1, error: "Doesn't Exist" });
    }
};

const signIn = async (req, res) => {
    // Variables used later
    const email = req.body.email;

    const password = req.body.password;
    var user, userData, docRef, docRef, userID;
    var userExists = false;

    // Tries to Sign in with firebase authentification
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            user = userCredentials.user;
            userID = user.uid;
            userExists = true;
            docRef = doc(database, "userData", userID);
            docRef = doc(database, "userData", userID);
        }) // Send's an error back if this log-in isn't complete
        .catch((err) => {
            res.send({err, status : "Failed"});
        });

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1500);

    if (!userExists) 
        res.send({status: "Failed"});
    // Retrieves User Data
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        userData = docSnap.data();
        res.send({ userID, userData });
    } else {
        res.send({ errCode: 1, error: "Doesn't Exist" });
    }
};

const getUserListings = async (req, res) => {
    const { uID } = req.params;
    
    const listingData = [];
    const mensPath = '/listings/clothing/menswear';
    const womensPath = '/listings/clothing/womenswear';
    const productsPath = '/listings/products/other';

    // search through each collection for the listings made by this user
    var q = query(collection(database, mensPath), where("uID", "==", uID));
    var querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        listingData.push(doc.data());
    });

    q = query(collection(database, womensPath), where("uID", "==", uID));
    var querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        listingData.push(doc.data());
    });

    q = query(collection(database, productsPath), where("uID", "==", uID));
    var querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        listingData.push(doc.data());
    });
    res.send({ listingData })
}

module.exports = {
    createUser,
    updateUser,
    signIn,
    getUserListings,
};
