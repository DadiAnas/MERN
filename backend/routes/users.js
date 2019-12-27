const router = require('express').Router();
let User = require('../models/user.model');

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/list').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:page/:id').get(
  (req, res) => {
    let page=req.params.page || 1;
    let size=req.params.size;

    User.find().skip(page * size).limit(parseInt(size))
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const username = req.body.username;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const news = req.body.news;
  const email = req.body.email;
  const photo = req.body.photo;

  const newUser = new User({
    username,
    gender,
    dob,
    news,
    email,
    photo
  });
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put(
  (req,res) => {
    User.findByIdAndUpdate(req.params.id)
    .then(User => {
      User.username = req.body.username;
      User.gender = req.body.gender;
      User.dob = req.body.dob;
      User.news = req.body.news;
      User.email = req.body.email;
      User.photo = req.body.photo;
      User.save()
      .then(()=> res.json('User updated'))
      .catch(err => res.status(400).json('Erreur:'+err));
  })
  .catch(err => res.status(400).json('Erreur:'+err));
});

router.route('/:id').delete(
  (req,res) => {
      User.findByIdAndDelete(req.params.id)
      .then(User => res.json('User '+User+'is deleted !') )
      .catch(err => res.status(400).json('Delete Error'+err));
  }
);



module.exports = router;