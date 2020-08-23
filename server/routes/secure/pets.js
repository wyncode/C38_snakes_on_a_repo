const router = require('express').Router();
const Pet = require('../../db/models/pet');

// Get All Pets
router.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.find();
    if (!pets) {
      res.sendStatus(410);
    } else {
      res.status(200).json(pets);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create New Pet
router.post('/pets', async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    await newPet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Pet by ID
router.get('/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      res.sendStatus(410);
    } else {
      res.status(200).json(pet);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete User by ID
router.delete('/pets/:id', async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json('Pet deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Pet by ID
router.put('/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
