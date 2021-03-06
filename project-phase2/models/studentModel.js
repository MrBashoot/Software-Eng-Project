'use strict';
let mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
    studentID: Number,
    firstname: String,
    lastname: String,
    dob: String,
    gender: String,
    schoolgrade: number,
    teacherID: number
});

module.exports = mongoose.model('student', studentSchema);


