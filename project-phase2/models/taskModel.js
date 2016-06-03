

'use strict';

let mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    taskId: Number,
    studentID: Number,
    surahId: Number,
    surahName: String,
    fromAya: Number,
    toAya: Number,
    type: String,
    dueDate: Date,
    completedDate: Date,
    masteryLevel: String,
    comment: String
});

module.exports = mongoose.model('task', taskSchema);



//:(