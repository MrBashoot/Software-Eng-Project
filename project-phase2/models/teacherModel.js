/**
 * Created by Ahmed on 5/30/2016.
 */
'use strict';
let mongoose = require('mongoose');

let teacherSchema = new mongoose.Schema({
    staffNo: Number,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    halaqa: String,
    isCoordinator: Boolean
});

module.exports = mongoose.model('teacher', teacherSchema);