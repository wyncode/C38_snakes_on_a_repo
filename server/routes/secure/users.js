const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const User = require('../../db/models/user');

// Get All Users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.sendStatus(410);
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Get User by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.sendStatus(410);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Delete User by ID
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json('User deleted');
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Update User by ID
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Get Current User
router.get('/users/me', async (req, res) => res.json(req.user));

// Update Current User
router.put('/users/me', async (req, res) => {
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
router.post('/users/logout', async (req, res) => {
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
router.post('/users/logoutAll', async (req, res) => {
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
router.post('/users/avatar', async (req, res) => {
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
