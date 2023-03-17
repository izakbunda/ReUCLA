const express = require("express");

// Getting the middleware
const {
    createUser,
    getUser,
    updateUser,
    signIn,
    getUserListings,
} = require("../controllers/userController");

const {
    createListing,
    getCategory,
    searchDB,
} = require("../controllers/marketController");

const router = express.Router();

// User Routing
router.post("/create/User", createUser);
router.post("/user/signIn", signIn);
router.post("/user/update", updateUser);

// Market Routing
router.post("/listings/create", createListing);
router.get("/listings/:category/:gender/:subcategory", getCategory);
router.get("/listings/:title/", searchDB);

module.exports = router;
