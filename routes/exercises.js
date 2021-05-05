const router = require('express').Router();
let Exercise = require('../models/exercise.models');

router.route('/').get((req, res) => {
    Exercise.find()
     .then(exercises => res.json(exercises))
     .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newexercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newexercise.save()
     .then(() => res.json('exercise added'))
     .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/:id').get((req, res) => {
        Exercise.findById(req.params.id)
            .then(exercises => res.json(exercises))
            .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/:id').delete((req, res) => {
        Exercise.findByIdAndDelete(req.params.id)
            .then(() => res.json('exercise deleted'))
            .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/update/:id').post((req, res) => {
        Exercise.findById(req.params.id)
            .then(updateexercise => {
                updateexercise.username = req.body.username;
                updateexercise.description = req.body.description;
                updateexercise.duration = Number(req.body.duration);
                updateexercise.date = Date.parse(req.body.date);
                
            updateexercise.save()
                .then(() => res.json('user updated'))
                .catch(err => res.status(400).json('ERROR: ' + err));
            })
            .catch(err => res.status(400).json('ERROR: ' + err));
});

module.exports = router;