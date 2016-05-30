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
    students: []
});

module.exports = mongoose.model('parent', parentSchema); //hello world

//qwde