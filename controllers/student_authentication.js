const validation = require("../middlewares/validator");

let emailValidator = validation.emailValidator;

let nameValidator = validation.nameValidator;

let passwordValidator = validation.passwordValidator;

let phoneValidator = validation.phoneValidator;

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const Student_signup_models= require("../models/student_authentication");

let errorArray= [];

exports.student_signup= (req, res) => {

   const {email, password, firstname, lastname, date, phone, gender, state, education_level} = req.body; 

   if(!email || !password || !firstname || !lastname || !date || !phone || !gender || !state || !education_level ) {
       errorArray.push("please fill all fields");
       res.status(201).json({errorArray});

   }
   else{

    if(!nameValidator(firstname)){
        errorArray.push("incorrect name");
    }

    if(!nameValidator(lastname)){
        errorArray.push("incorrect lastname");
    }

    if (!emailValidator(email)) {
      errorArray.push("invalid email");
    }

    if(!passwordValidator(password)){
      errorArray.push("password should be 7 or more characters");
    }

    if(phoneValidator(phone)){
        errorArray.push("invalid phone number");
    }
 
    // check if email already exists
    Student_signup_models.findOne({ email }).then(
    (emailCheck) => {

      if (emailCheck) {

        errorArray.push("email already exists");
        
      }

      if (errorArray.length > 0) {
        return res.status(201).json({ errorArray });
      
      }

      // hash the password and save to database
      bcrypt.hash(password, 10).then(
        (hash) => {

          const student_profile = new Student_signup_models({
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
            .then(() => {
              res.status(200).json('user registered')
            })
            .catch((err) => res.status(400).json(`Error: ${err}`));

        }
      ).catch((err) => res.status(400).json(`Error: ${err}`));


    }

  ).catch((err) => res.status(400).json(`Error: ${err}`));
}    
   }

   //student login route
   exports.studentLogin = (req, res) => {

    const { email, password } = req.body;
  
    student_signup_models.findOne({ email }).then(
      (user) => {
  
        if (!user) {
          return res.status(201).json({ message: "email and password do not match" });
        } 
  
        bcrypt.compare(password, user.password).then(
          (valid) => {
  
            if (!valid) {
  
              return res.status(201).json({ message: "email and password do not match" });
            }
  
            const token = jwt.sign(
              { userId: user._id },
              "RANDOM_TOKEN_SECRET_NUMBER",
              { expiresIn: "24h" }
            );
  
            res.status(200).json({
              _id : user._id,
              email: user.email,
              password: user.password,
              firstname: user.firstname,
              lastname: user.lastname, 
              date: user.date,
              phone: user.phone,
              gender: user.gender,
              state: user.state,
              education_level: user.educatin_level,
              token,
              message: "user logged in"
            });
          }
        ).catch((err) => res.status(400).json(`Error: ${err}`));
      }
    ).catch((err) => res.status(400).json(`Error: ${err}`));
  
  
  };
