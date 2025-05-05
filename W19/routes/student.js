const express = require('express');
const router = express.Router();
const studentController = require('../controller/students');

// POST route for adding a student
router.post('/addstudent', studentController.addstudent);

module.exports = router;                    