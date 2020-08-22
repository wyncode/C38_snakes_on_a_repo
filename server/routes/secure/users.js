const router = require('express').Router();
const User = require('../../db/models/user');

router.get('/users', (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      if (!users) {
        res.sendStatus(410);
      } else {
        res.status(200).json(users);
      }
    }
  });
});

router.post('/users', (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((res) => res.json('added new user!'))
    .catch((err) => res.status(400).json(err));
});

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      if (!user) {
        res.sendStatus(410);
      } else {
        res.status(200).json(user);
      }
    }
  });
});

router.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((res) => res.json('User deleted'))
    .catch((err) => res.status(400).json(err));
});

router.put('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user
        .save()
        .then(() => res.json('User updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
