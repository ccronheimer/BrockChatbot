const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const athleteSchema = new Schema({
    athlete: { type: String, required: true },
    sport: { type: String, required: true},
    key: { type: String, required: true},
}, {
    timestamps: true,
    collection: 'athlete_sport',
});

const Athlete = mongoose.model('Athlete', athleteSchema);

module.exports = Athlete;

