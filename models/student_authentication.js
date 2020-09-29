const mongoose= require("mongoose");

const Student_registration= mongoose.Schema;

const student_model =  new Student_registration({
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    date: {type: String, required: true},
    phone: {type: Number, required: true}, 
    gender: {type: String, required: true},
    state: {type: String, required: true},
    education_level: {type: String, required: true},
},
{
    timestamps : true
});

const student_registration_model = mongoose.model("student_registration", student_model);

module.exports = student_registration_model;