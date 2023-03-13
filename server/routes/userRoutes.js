const express=require('express')

// Getting the middleware
const { createUser, getUser, updateUser, signIn }= require('../controllers/userController');
const { createListing } = require('../controllers/marketController');


const router = express.Router();


// User Routing
router.post('/create/User', createUser);
router.get('/fetch/UserData', getUser);
router.get('user/signin', signIn);

// Marketplace Routing
router.post('/create/Listing', createListing);
// router.get()

module.exports=router