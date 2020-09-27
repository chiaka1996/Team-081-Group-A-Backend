// import {emailValidator, nameValidator, passwordValidator, phoneValidator} from "../validator";
let validation = require("./validator");

let emailValidator = validation.emailValidator;

let nameValidator = validation.nameValidator;

let passwordValidator = validation.passwordValidator;

let phoneValidator = validation.phoneValidator;

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const student_signup_models = require("../models/student_authentication");

let errorArray = [];

exports.student_signup = (req, res) => {

  console.log(req.body);

   const {email, password, firstname, lastname, date, phone, gender, state, education_level} = req.body; 

   if(!email || !password || !firstname || !lastname || !date || !phone || !gender || !state || !education_level ) {
       errorArray.push("please fill all fields");
   }
   else{

    if(!nameValidator(firstname)){
        errorArray.push("incorrect name");
    }

    if(!nameValidator(lastname)){
        errorArray.push("incorrect name");
    }

    if(phoneValidator(phone)){
        errorArray.push("invalid phone number");
    }
 
    // check if email already exists
    student_signup_models.findOne({ email }).then(
    (emailCheck) => {
      if (emailCheck) {

        errorArray.push('email already exists');

      }

      if (!emailValidator(email)) {
        errorArray.push('please input the correct email');
      }

      if(!passwordValidator(password)){
        errorArray.push('password should be 7 or more characters');
      }

      if (errorArray.length > 0) {
        return res.status(201).json({ errorArray });
      
      }

      // hash the password and save to database
      bcrypt.hash(password, 10).then(
        (hash) => {

          const student_profile = new student_signup_models({
            email, 
            password : hash,
            firstname, 
            lastname, 
            date, 
            phone, 
            gender, 
            state, 
            education_level
          });
          
          student_profile.save()
            .then(() => res.json('user registered'))
            .catch((err) => res.status(400).json(`Error: ${err}`));

        }
      ).catch((err) => res.status(400).json(`Error: ${err}`));


    }

  ).catch((err) => res.status(400).json(`Error: ${err}`));


}
    
   }
