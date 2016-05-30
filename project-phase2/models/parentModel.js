/**
 * Created by Ahmed on 5/30/2016.
 */

'use strict';
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
        studentID: Number,
        firstName: String,
        lastName: String,
        dob: String,
        gender: String,
        schoolGrade: Number,
        teacherID: { type : mongoose.Schema.ObjectId, ref : 'teacher' }   
    }]
});

module.exports = mongoose.model('parent', parentSchema); //hello world
