const cloudinary= require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const validation= require("../middlewares/validator");

const emailValidator= validation.emailValidator;

const nameValidator= validation.nameValidator;

const passwordValidator= validation.passwordValidator;

const phoneValidator= validation.phoneValidator;

const experienceValidator= validation.experienceValidator;

const fileValidator= validation.fileValidator;

const bcrypt= require("bcrypt");

const jwt= require("jsonwebtoken");

const Tutor_signup_models = require("../models/tutor_authentication");

let errorArray = [];

exports.tutor_signup = (req, res) => {   
     const file = req.files == null ? false : req.files.file;
    
    const {email, password, firstname, lastname, date, phone, gender, state, education_level, experience, job} = req.body; 

    if(!email || !password || !firstname || !lastname || !date || !phone || !gender || file===false || !state || !education_level || !experience || !job) {
        errorArray.push("please fill all fields");
        res.status(201).json({errorArray});
    }
    else{
        if(!nameValidator(firstname)){
            errorArray.push("incorrect name");
        }

        if (!emailValidator(email)) {
            errorArray.push("please input the correct email");
          }
    
          if(!passwordValidator(password)){
            errorArray.push("password should be 7 or more characters");
          }
    
        if(!nameValidator(lastname)){
            errorArray.push("incorrect name");
        }
    
        if(phoneValidator(phone)){
            errorArray.push("invalid phone number");
        }

        if(!fileValidator(file.mimetype)){
            errorArray.push("only images allowed");
        }
        
        if(!experienceValidator(experience)) {
            errorArray.push("experience should be in only digits");
        }

        // check if email already exists
    Tutor_signup_models.findOne({ email }).then(
        (emailCheck) => {
          if (emailCheck) {
             errorArray.push("email already exists");
            }
    
          if (errorArray.length > 0) {
            return res.status(201).json({ errorArray });
          
          }

             cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
                //hash the password
                bcrypt.hash(password, 10).then(
                    (hash) => {
            
                      const tutor_profile = new Tutor_signup_models({
                        email, 
                        password: hash,
                        firstname, 
                        lastname, 
                        date, 
                        phone, 
                        gender, 
                        state, 
                        education_level,
                        experience,
                        job,
                        certification_url: result.url   
                      });
                      
                      tutor_profile.save()
                        .then(() => res.json("user registered"))
                        .catch((errs) => res.status(400).json(`Error: ${errs}`));
            
                    }
                  ).catch((errs) => res.status(400).json(`Error: ${errs}`));
        
      });
    
        }
    
      ).catch((err) => res.status(400).json(`Error: ${err}`));

    }
    
};

   //student login route
   exports.tutorLogin = (req, res) => {

    const { email, password } = req.body;
  
     Tutor_signup_models.findOne({ email }).then(
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
              experience: user.experience,
              job: user.job,
              certification_url: user.certification_url,
              message: "user logged in"
            });
          }
        ).catch((err) => res.status(400).json(`Error: ${err}`));
      }
    ).catch((err) => res.status(400).json(`Error: ${err}`));
  
  
  };

 