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
      email: faker.internet.email(),
      password: faker.internet.password(),
      owner: Boolean(Math.round(Math.random())),
      description: faker.lorem.paragraph(), 
      favUsers:,
      favPets:
      ownedPets:
      
      
    });
    await me.generateAuthToken();
    userIdArray.push(me._id);
  }

  for (let i = 0; i < 1000; i++) {
    const pet = new Pet({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,  
      type: faker.
      description: faker.lorem.paragraph(),
      feeding: faker.lorem.paragraph(),
      cleaning: faker.lorem.paragraph(),
      exercise: faker.lorem.paragraph(),
      medical: faker. lorem.paragraph(),
      additional: faker.lorem.paragraph(),
      emergency: faker.phone.phoneNumber(),
      links: faker.internet.url(),
      owner: userIdArray[Math.floor(Math.random() * userIdArray.length)]
      
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
