const router = require('express').Router();
let Athlete = require('../models/athlete.model');

// GET 
router.route('/').get((req, res) => {
    Athlete.find()
        // return athletes in json
        .then(athletes => res.json(athletes))
        // if error return 400 
        .catch(err => res.status(400).json('Error: ' + err));
})

// // POST * will not be needed *
// router.route('/add').post((req, res) => {
//     const athlete = req.body.athlete;

//     const newAthlete = new Athlete({athlete});

//     newAthlete.save()
//         .then(() => res.json('User added!'))
//         .catch(err => res.status(400).json('Error: ' + err));

// })

module.exports = router;