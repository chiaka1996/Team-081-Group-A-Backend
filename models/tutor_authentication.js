const mongoose = require("mongoose");

const tutor_registration = mongoose.Schema;

const tutor_model =  new tutor_registration({
  
 certification_url : {type: String, required: true},
 email : {type: String, required: true},
 password : {type: String, required: true},
 firstname : {type: String, required: true},
 lastname : {type: String, required: true},
 date : {type: String, required: true},
 phone: {type: Number, required: true}, 
 gender : {type: String, required: true},
 state : {type: String, required: true},
 education_level : {type: String, required: true},
 experience: {type: Number, required: true},
 job : {type: String, required: true}
},
{
    timestamps : true
});

const tutor_registration_model = mongoose.model("tutor_registration", tutor_model);

module.exports = tutor_registration_model;