const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const Pet = require('../../db/models/pet');
const User = require('../../db/models/user');

// Create New Pet For Current User
router.post('/pets', async (req, res) => {
  const {
    name,
    type,
    avatar,
    description,
    feeding,
    cleaning,
    exercise,
    medical,
    additional,
    emergency,
    links
  } = req.body;
  try {
    const newPet = new Pet({
      name,
      type,
      avatar,
      description,
      feeding,
      cleaning,
      exercise,
      medical,
      additional,
      emergency,
      links,
     owner: req.user._id
    });
    await newPet.save();
    // once passport is up and running, test without the following
    //3 lines; they might not be necessary
    const newPetOwner = await User.findById(newPet.owner);
    newPetOwner.ownedPets.push(newPet._id);
    await newPetOwner.save();
    res.status(201).json(newPet);
  } catch (err) {
    if (err.errors.type.kind === 'enum') {
      res.status(500).json({ err: 'not a valid pet type' });
    } else {
      res.status(500).json({ err: err.toString() });
    }
  }
});

// Delete Pet by ID
router.delete('/pets/:id', async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json('Pet deleted');
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Update Pet by ID
router.put('/pets/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'type',
    'description',
    'feeding',
    'cleaning',
    'exercise',
    'medical',
    'additional',
    'emergency',
    'links',
    'avatar'
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Add Pet Link
router.post('/pets/:id/link', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    const {links} = pet;
    links.push(req.body)
    pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Edit Pet Link By ID
router.put('/pets/:id/link/:linkID', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    const {links} = pet;
    const link = await pet.links.id(req.params.linkID);
    link.remove();
    links.push(req.body);
    pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Get Pet Link by ID
router.get('/pets/:id/link/:linkID', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    const link = await pet.links.id(req.params.linkID);
    res.status(200).json(link);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Delete Pet Link by ID
router.delete('/pets/:id/link/:linkID', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    const link = await pet.links.id(req.params.linkID);
    link.remove();
    pet.save();
    res.json(pet);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Upload Pet Avatar
router.post('/pets/avatar/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      res.sendStatus(410);
    } else {
      const response = await cloudinary.uploader.upload(
        req.files.avatar.tempFilePath
      );
      pet.avatar = response.secure_url;
      await pet.save();
      res.json(pet);
    }
  } catch (err) {
    res.status(400).json({ err: err.toString() });
  }
});

module.exports = router;
