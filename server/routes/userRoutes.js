const express = require("express");

// Getting the middleware
const {
    createUser,
    getUser,
    updateUser,
    signIn,
} = require("../controllers/userController");

const {
    createListing,
    getCategory,
    searchDB,
} = require("../controllers/marketController");

const router = express.Router();

// User Routing
router.post("/create/User", createUser);
router.post("/fetch/UserData", getUser);
router.post("/user/signIn", signIn);
router.post("/user/update", updateUser);

router.post("/listings/create", createListing);
router.get("/listings/:category/:gender/:subcategory", getCategory);
router.get("/listings/:title/", searchDB);

// router.get('listing/fetch/one')
// router.get('listing/fetch/page')
// router.get()

module.exports = router;
