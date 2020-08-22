const router = require('express').Router();
const Pet = require('../../db/models/pet');

router.get('/pets', (req, res) => {
  Pet.find((err, pets) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      if (!pets) {
        res.sendStatus(410);
      } else {
        res.status(200).json(pets);
      }
    }
  });
});

router.post('/pets', (req, res) => {
  const newPet = new Pet(req.body);
  newPet
    .save()
    .then((res) => res.json('added new pet!'))
    .catch((err) => res.status(400).json(err));
});

router.get('/pets/:id', (req, res) => {
  Pet.findById(req.params.id, (err, pet) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      if (!pet) {
        res.sendStatus(410);
      } else {
        res.status(200).json(pet);
      }
    }
  });
});

router.delete('/pets/:id', (req, res) => {
  Pet.findByIdAndDelete(req.params.id)
    .then((res) => res.json('Pet deleted'))
    .catch((err) => res.status(400).json(err));
});

router.put('/pets/:id', (req, res) => {
  Pet.findById(req.params.id)
    .then((pet) => {
      pet
        .save()
        .then(() => res.json('Pet updated!'))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
