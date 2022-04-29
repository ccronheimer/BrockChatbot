const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schedule = new Schema({
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

const Schedule = mongoose.model('schedule', schedule);

module.exports = Schedule;

