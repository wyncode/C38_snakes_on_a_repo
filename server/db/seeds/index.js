if (process.env.NODE_ENV !== 'production') require('dotenv').config();

require('./index');

const User = require('../models/user'),
  Pet = require('../models/pet'),
  faker = require('faker'),
  mongoose = require('mongoose');

const dbReset = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }

  await User.countDocuments({}, function (err, count) {
    console.log('Number of users:', count);
  });
  await Pet.countDocuments({}, function (err, count) {
    console.log('Number of pets:', count);
  });
  const userIdArray = [];

  for (let i = 0; i < 1000; i++) {
    const me = new User({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      owner: Boolean(Math.round(Math.random())),
      email: faker.internet.email(),
      password: faker.internet.password()
    });
    await me.generateAuthToken();
    userIdArray.push(me._id);
  }

  for (let i = 0; i < 1000; i++) {
    const pet = new Pet({
      description: faker.lorem.paragraph(),
      completed: Boolean(Math.round(Math.random())),
      dueDate: faker.date.future(),
      owner: userIdArray[Math.floor(Math.random() * userIdArray.length)]
      // Line 41 could be used for fav. sitters/pets
    });
    await task.save();
  }
  await User.countDocuments({}, function (err, count) {
    console.log('Number of users:', count);
  });
  await Pet.countDocuments({}, function (err, count) {
    console.log('Number of pets:', count);
  });
};

dbReset();
