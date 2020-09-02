const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const User = require('../../db/models/user');

// Get Current User
router.get('/user/me', async (req, res) => res.json(req.user));

// Get Current User's Favorites
router.get('/user/me/favorites', async (req, res) => {
  try {
    let favorites = await req.user.find({}).select('favUsers favPets');
    res.send(favorites);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Add Or Remove Favorite
router.put('/user/me/favorites/:fav/:id', async (req, res) => {
  // let favType = req.params.fav;
  try {
    // if (req.user[favType].includes(req.params.id)) {
    //   req.user[favType] = req.user[favType].filter((id) => id !== req.params.id);
    // } else {
    //   req.user.favType.push(req.params.id);
    // }
    // res.send(req.user[favType]);
    res.send('is this working');
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Update Current User
router.put('/user/me', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'email',
    'password',
    'avatar',
    'description',
    'ownedPets',
    'favPets',
    'favUsers'
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid updates!' });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json(req.user);
  } catch (err) {
    res.status(400).json({ err: err.toString() });
  }
});

// Delete Current User
router.delete('/user/me', async (req, res) => {
  try {
    await req.user.remove();
    res.clearCookie('jwt');
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// User Logout
router.post('/user/logout', async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'logged out!' });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// User Logout (all devices)
router.post('/user/logoutAll', async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'all devices logged out' });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Update Password
router.put('/password', async (req, res) => {
  try {
    user.password = req.body.password;
    await user.save();
    res.clearCookie('jwt');
    res.json({ message: 'password updated successfully' });
  } catch (err) {
    res.json({ err: err.toString() });
  }
});

// Upload Avatar
router.post('/user/avatar', async (req, res) => {
  try {
    const response = await cloudinary.uploader.upload(
      req.files.avatar.tempFilePath
    );
    req.user.avatar = response.secure_url;
    await req.user.save();
    res.json(response);
  } catch (err) {
    res.status(400).json({ err: err.toString() });
  }
});

module.exports = router;
