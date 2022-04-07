const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const athleteSchema = new Schema({
    name: { type: String, required: true },
    cont: { type: String, required: true}, 
    hometown: { type: String, required: true}, 
    sport: { type: String, required: true},
    age: { type: String, required: true}, 
    height: { type: String, required: true}, 
    weight: { type: String, required: true},
    key: { type: String, required: true},

}, {
    timestamps: true,
    collection: 'athletes',
});

const Athlete = mongoose.model('Athlete', athleteSchema);

module.exports = Athlete;

