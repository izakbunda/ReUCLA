const express=require('express')

const { createUser, readUser, updateUser, deleteUser }= require('../controllers/userController')

const router = express.Router()


// router.get('/', createUser);
router.post('/', createUser);

module.exports=router