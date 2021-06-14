const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const {validationResult} = require('express-validator');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();
const signupTemplate = require('./signup');
const signinTemplate = require('./signin');
const {validateUsername , validateEmail , validatePassword ,confirmPassword} = require('./validation');

router.use(bodyParser.urlencoded({extended: true}));
router.use(express.static(path.join(__dirname,'./public')));

// show the homepage
router.get('/' , async(req , res) => {

        res.send(signupTemplate({}));
}
);

// route for signing up
router.post('/signup' , [validateUsername , validateEmail , validatePassword ,confirmPassword] , 
                async(req , res) => {
                   try{

                        // perform validation
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {

                            // data is invalid - send "bad request"
                            return res.status(400).send(signupTemplate({ errors }));
                        }

                        // generate salt with 10 rounds
                        const salt = await bcrypt.genSalt(10);
    
                        // password hashing
                        let hashPassword = await bcrypt.hash(req.body.password, salt);

                            let user = new User({
                                username : req.body.username,
                                email : req.body.email,
                                password : hashPassword
                            });

                            // save user details
                            // send a 200 status with "Registration successful" message
                            user = await user.save();
                            res.status(200).send("<div align ='center'><h2>Registration successful</h2></div>"); 
                    }catch(ex) {
                        res.status(500).send("<div align ='center'><h2>Internal server error</h2></div>");
                    }
});

// route for signing in
router.post('/signin' , async(req , res) => {

    try{

        // search for user using username
        let findUser = await User.findOne({ username: req.body.username });
        if(!findUser) {
            return res.send(signinTemplate({}));
        }

        let submittedPassword = req.body.password;
        let storedPassword = findUser.password;

        // compare entered passoword and the stored password
        // to ensure they match
        const passwordMatch = await bcrypt.compare(submittedPassword , storedPassword);
        if(passwordMatch) {

            // send a JWT token upon successful authentication
            const token = jwt.sign({username : findUser.username} , process.env.PRIVATE_KEY , {
                expiresIn: 60
            });
            res.cookie("jwt", token, {secure: true, httpOnly: true});
            res.send("<div align ='center'><h2>Login successful</h2></div>");
        }
        else {
            return res.send(signinTemplate({}));
        }
    }catch(ex) {
        res.status(500).send("<div align ='center'><h2>Internal server error</h2></div>");
    }
});

module.exports = router;