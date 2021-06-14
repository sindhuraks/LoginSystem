const {check} = require('express-validator');
const {User} = require('../models/user');
  
module.exports = {

    // username validation :
    // 1. Should contain alphabets and numbers
    // 2. Min length = 5
    // 3. Mandatory field
    // 4. If an username exists, then that username cant be used
    
    validateUsername :check('username').isAlphanumeric().isLength({min : 5})
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .custom((value , {req}) => {
            return new Promise((resolve, reject) => {
                User.findOne({username:req.body.username}, function(err, user){
                  if(err) {
                    //reject(new Error('Server Error'))
                  }
                  if(Boolean(user)) {
                    reject(new Error('Username already in use'))
                  }
                  resolve(true)
                });
              });
        }) ,

    // email validation :
    // 1. Check for valid email format and normalize it
    // 2. Mandatory field
    // 4. If an email exists, then that email cant be used
    validateEmail : check('email').isEmail().normalizeEmail() 
            .not()
            .isEmpty()
            .withMessage('Email is required')
            .custom((value , {req}) => {
                return new Promise((resolve, reject) => {
                    User.findOne({email:req.body.email}, function(err, user){
                      if(err) {
                        //reject(new Error('Server Error'))
                      }
                      if(Boolean(user)) {
                        reject(new Error('Email already in use'))
                      }
                      resolve(true)
                    });
                  });
            }),

    // password validation :
    // 1. Should contain an uppercase letter and lowercase letters
    // 2. Min length = 8
    // 3. Should contain numbers
    // 4. Mandatory field
    validatePassword : check('password').isLength({min : 8}).matches(/[a-zA-Z0-9^a-zA-Z0-9]/g),

    // check if the entered and re-entered passwords match
    confirmPassword : check('repeat_password', 'Passwords do not match')
          .exists()
          .custom((value, { req }) => value === req.body.password)
};