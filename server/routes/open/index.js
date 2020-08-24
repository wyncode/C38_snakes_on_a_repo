const router = require('express').Router();
const User = require('../../db/models/user');

// Create New User
router.post('/users', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(403)
      .json('Sorry, an account with that email already exists.');
  }
  try {
    const newUser = new User(req.body);
    const token = await newUser.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// User Login
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    res.status(200).json('Logged in!');
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// remove once jwt added
let testToken = 'faketoken';

// Password Reset
router.get('/password', async (req, res) => {
  try {
    const { email } = req.query,
      user = await User.findOne({ email });
    if (!user) throw new Error("account doesn't exist");
    testToken = Math.random().toString();
    res.json({ message: 'reset password email sent', token: testToken });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Password Redirect
router.get('/password/:token', (req, res) => {
  const { token } = req.params;
  try {
    // REPLACE FOLLOWING WITH JWT
    if (testToken === token) {
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 600000,
        sameSite: 'Strict'
      });
      res.redirect(process.env.URL + '/update-password');
      // console.log('redirecting...');
    } else {
      throw new Error('tokens do not match');
    }
  } catch (err) {
    res.status(401).json({ err: err.toString() });
  }
});

module.exports = router;
