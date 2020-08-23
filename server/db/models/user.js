const mongoose = require('mongoose'),
  validator = require('validator'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  Pet = require('./pet');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('email is invalid');
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error("can't contain 'password'");
        }
        if (value.length < 5) {
          throw new Error('password must be at least 5 characters long.');
        }
      }
    },
    owner: {
      type: Boolean,
      required: true,
      default: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: String
    },
    description: {
      type: String
    },
    favUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    favPets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
      }
    ],
    ownedPets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
      }
    ]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
