"use strict";
let mongoose = require('mongoose');

let parentSchema = new mongoose.Schema({
    qatariId: Number,
    firstName: String,
    lastName: String,
    mobile: String,
    email: String,
    username: String,
    password: String,
    students: [{
        studentId: Number,
        firstName: String,
        lastName: String,
        dob: String,
        gender: String,
        schoolGrade: Number,
        teacherId: Number
    }]
});

module.exports = mongoose.model('parent', parentSchema);
