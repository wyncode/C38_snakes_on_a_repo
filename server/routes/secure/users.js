const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const User = require('../../db/models/user');

// Get Current User
router.get('/user/me', async (req, res) => res.json(req.user));

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

// ***********************************************//
// Delete a user
// ***********************************************//
router.delete('/api/users/me', async (req, res) => {
  try {
    await req.user.remove();
    CancellationEmail(req.user.email, req.user.name);
    res.clearCookie('jwt');
    res.json(req.user);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
