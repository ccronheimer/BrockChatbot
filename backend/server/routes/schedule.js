const router = require('express').Router();
let Schedule = require('../models/schedule.model');

// GET 
router.route('/').get((req, res) => {
    Schedule.find()
        // return athletes in json
        .then(schedule => res.json(schedule))
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