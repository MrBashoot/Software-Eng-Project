

'use strict';

let mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    taskId: Number,
    studentId: Number,
    surahId: Number,
    surahName: String,
    fromAya: Number,
    toAya: Number,
    type: String,
    dueDate: String,
    completedDate: String,
    masteryLevel: String,
    comment: String
});

module.exports = mongoose.model('task', taskSchema);



//:(