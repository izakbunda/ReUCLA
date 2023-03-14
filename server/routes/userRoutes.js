const express=require('express')

// Getting the middleware
const { createUser, getUser, updateUser, signIn }= require('../controllers/userController');
const { createListing } = require('../controllers/marketController');


const router = express.Router();


// User Routing
router.post('/create/User', createUser);
router.get('/fetch/UserData', getUser);
router.post('/user/signIn', signIn);
router.post('/user/update')

// Marketplace Routing
router.post('listing/create/', createListing);
// router.get('listing/fetch/one')
// router.get('listing/fetch/page')
// router.get()

module.exports=router