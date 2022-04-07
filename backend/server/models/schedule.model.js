const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const athleteSchema = new Schema({
    time: { type: String, required: true },
    sport: { type: String, required: true}, 
    gender: { type: String, required: true}, 
    pool: { type: String, required: true},
    location: { type: String, required: true},
    key: { type: String, required: true},

}, {
    timestamps: true,
    collection: 'schedule',
});

const Athlete = mongoose.model('schedule', athleteSchema);

module.exports = Athlete;

