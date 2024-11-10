const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/authcontroller");
const {authenticateToken}=require("../utils/jwt")

router.post('/signup', authcontroller.signup); 
router.post('/login',authenticateToken, authcontroller.login);    
module.exports = router;
