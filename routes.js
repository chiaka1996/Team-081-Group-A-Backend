const router= require("express").Router();

const student_authentication= require("./controllers/student_authentication");

const tutor_authentication= require("./controllers/tutor_authentication");

router.post("/student_profile", student_authentication.student_signup);

router.post("/student_login", student_authentication.studentLogin);

router.post("/tutor_profile", tutor_authentication.tutor_signup);

router.post("/tutor_login", tutor_authentication.tutorLogin);

module.exports= router;