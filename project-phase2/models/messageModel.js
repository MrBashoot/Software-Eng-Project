'use strict';
let mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    id: Number,
    studentId: String,
    subject: String,
    message: String,
    date: String
});
module.exports = mongoose.model('message', messageSchema);