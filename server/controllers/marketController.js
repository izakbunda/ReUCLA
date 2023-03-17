const { database } = require("../firebase.js");
const { FieldValue } = require("@google-cloud/firestore");
const { auth } = require("../firebase");
const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} = require("firebase/auth");
const { firestore } = require("firebase-admin");
const {
    doc,
    setDoc,
    Timestamp,
    addDoc,
    getDoc,
    collection,
    updateDoc,
    query,
    getDocs,
    where,
} = require("firebase/firestore");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");

const createListing = async (req, res) => {
    // console.log("here");
    const title = req.body.title,
        description = req.body.description,
        category = req.body.category,
        condition = req.body.condition,
        price = req.body.price,
        gender = req.body.gender,
        subcategory = req.body.subcategory,
        userID = req.body.uID;
    var photoPath = req.body.photoPath;

    const storage = getStorage();
    var photoURL = "";

    if (photoPath) {
        const lastIndex = photoPath.lastIndexOf("/");
        photoPath = photoPath.substring(lastIndex + 1);
        photoURL = await getDownloadURL(ref(storage, photoPath));
        console.log("@1", photoURL);
    } else {
        photoPath = "/";
    }

    const docData = {
        title: title,
        description: description,
        photoPath: photoURL,
        category: category,
        condition: condition,
        price: price,
        gender: gender,
        subcategory: subcategory,
        uID: userID,
    };

    console.log(docData);
    var collectionPath = "/listings";

    if (category == "clothes") {
        if (gender == 1) collectionPath = collectionPath + "/clothing/menswear";
        else collectionPath = collectionPath + "/clothing/womenswear";
    } else {
        collectionPath = collectionPath + "/products/other";
    }

    const docRef = await addDoc(collection(database, collectionPath), docData);

    // Append data to listing
    const listID = docRef.id;
    const listPath = collectionPath + "/" + listID;
    const listRef = doc(database, collectionPath, listID);

    await updateDoc(listRef, { listID: listID });
    var userListings;
    const userRef = doc(database, "userData", userID);
    const userData = await getDoc(userRef);
    if (userData.exists()) {
        userListings = userData.data().userListings;
        console.log(userListings);
        userListings.push(listID);
        // console.log(userListings);
        await updateDoc(userRef, { userListings: userListings });
    } else {
        console.log("Why doesn't the user exist?");
    }
    var responseString = "Posted: " + title;
    res.send({ response: responseString });
};

const getCategory = async (req, res) => {
    const { category } = req.params;
    const { gender } = req.params;
    const { subcategory } = req.params;

    var collectionPath = "/listings";
    const listingData = [];

    if (category == "clothes" && gender != null) {
        if (gender == 1) collectionPath = collectionPath + "/clothing/menswear";
        else {
            collectionPath = collectionPath + "/clothing/womenswear";
        }
        const q = query(
            collection(database, collectionPath),
            where("subcategory", "==", subcategory)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data())
            listingData.push(doc.data());
        });
        res.send({ listingData });
    } else {
        collectionPath = collectionPath + "/products/other";
        const q = query(
            collection(database, collectionPath),
            where("category", "==", category)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data())
            listingData.push(doc.data());
        });
        res.send({ listingData });
    }
};

const searchDB = async (req, res) => {
    console.log(req.params);
    const { title } = req.params;
    const listingData = [];

    const menPath = "/listings/clothing/menswear";
    const womenPath = "/listings/clothing/womenswear";
    const otherPath = "/listings/products/other";

    const a = query(collection(database, menPath), where("title", "==", title));
    const querySnapshot1 = await getDocs(a);
    querySnapshot1.forEach((doc) => {
        console.log("HERE");
        listingData.push(doc.data());
    });

    const b = query(
        collection(database, womenPath),
        where("title", "==", title)
    );
    const querySnapshot2 = await getDocs(b);
    querySnapshot2.forEach((doc) => {
        listingData.push(doc.data());
    });

    const c = query(
        collection(database, otherPath),
        where("title", "==", title)
    );
    const querySnapshot3 = await getDocs(c);
    querySnapshot3.forEach((doc) => {
        listingData.push(doc.data());
    });
    res.send({ listingData });
};

module.exports = {
    createListing,
    getCategory,
    searchDB,
};
