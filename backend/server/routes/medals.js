const router = require('express').Router();
let Medals = require('../models/medals.model');

// GET 
router.route('/').get((req, res) => {
    Medals.find()
        // return athletes in json
        .then(medal => res.json(medal))
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