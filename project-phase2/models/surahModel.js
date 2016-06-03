'use strict';
let mongoose = require('mongoose');

let surahSchema = new mongoose.Schema({
    id: Number,
    name: String,
    englishName: String,
    ayaCount: String,
});

module.exports = mongoose.model('surah', surahSchema);
