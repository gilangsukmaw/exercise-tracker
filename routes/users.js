const router = require('express').Router();
let User = require('../models/user.models');

router.route('/').get((req, res) => {
    User.find()
     .then(users => res.json(users))
     .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newuser = new User({username});

    newuser.save()
     .then(() => res.json('user added'))
     .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/:id').get((req, res) => {
        User.findById(req.params.id)
            .then(User => res.json(User))
            .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/:id').delete((req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then(() => res.json('user deleted'))
            .catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/update/user/:id').post((req, res) => {
        User.findById(req.params.id)
            .then(updateuser => {
                updateuser.username = req.body.username;
            updateuser.save()
                .then(() => res.json('user updated'))
                .catch(err => res.status(400).json('ERROR: ' + err));
            })
            .catch(err => res.status(400).json('ERROR: ' + err));
});

module.exports = router;