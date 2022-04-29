const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const medalSchema = new Schema({
    contingent: { type: String, required: true },
    gold: { type: String, required: true}, 
    silver: { type: String, required: true}, 
    bronze: { type: String, required: true},
}, {
    timestamps: true,
    collection: 'Medals',
});

const Medal = mongoose.model('medals', medalSchema);

module.exports = Medal;

