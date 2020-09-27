const router = require("express").Router();

const student_authentication = require("./controllers/student_authentication");

router.post("/student_profile", student_authentication.student_signup);

router.post("/student_login", student_authentication.studentLogin);

module.exports = router;