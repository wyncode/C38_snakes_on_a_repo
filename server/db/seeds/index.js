if (process.env.NODE_ENV !== 'production') require('dotenv').config();

require('../config/index');

const User = require('../models/user'),
  Pet = require('../models/pet'),
  faker = require('faker'),
  moment = require('moment'),
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
  const petArray = [];

  for (let i = 0; i < 10; i++) {
    const user = new User({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
      owner: Boolean(Math.round(Math.random())),
      description: faker.lorem.paragraph(),
      avatar: faker.internet.avatar(),
      latitude: Math.random() + 25,
      longitude: Math.random() - 81
    });
    await user.generateAuthToken();
    userIdArray.push(user._id);
  }

  const allowedTypes = [
    'reptile',
    'bird',
    'fish',
    'mammal',
    'amphibian',
    'insect/arachnid',
    'other'
  ];

  const randomUser =
    userIdArray[Math.floor(Math.random() * userIdArray.length)];

  const randomElements = (array) => {
    let randomArray = [];
    for (let i = 0; i < 3; i++) {
      randomArray.push(array[randomNum(array)]);
    }
    return randomArray;
  };

  const randomNum = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  const randomEvents = (start, end) => {
    return {
      title: faker.lorem.words(),
      allDay: Boolean(Math.round(Math.random())),
      start: moment(start).toJSON(),
      end: moment(end).toJSON()
    };
  };

  for (let i = 0; i < 25; i++) {
    const randomIndex = Math.floor(Math.random() * allowedTypes.length);
    const randomType = allowedTypes[randomIndex];

    const pet = new Pet({
      name: `${faker.name.firstName()}`,
      type: randomType,
      avatar: faker.image.animals(),
      description: faker.lorem.paragraph(),
      feeding: faker.lorem.paragraph(),
      cleaning: faker.lorem.paragraph(),
      exercise: faker.lorem.paragraph(),
      medical: faker.lorem.paragraph(),
      additional: faker.lorem.paragraph(),
      emergency: faker.lorem.paragraph(),
      links: [
        { url: faker.internet.url(), text: faker.lorem.words() },
        { url: faker.internet.url(), text: faker.lorem.words() },
        { url: faker.internet.url(), text: faker.lorem.words() }
      ],
      events: [
        randomEvents(faker.date.recent(), faker.date.recent()),
        randomEvents(faker.date.recent(), faker.date.soon()),
        randomEvents(faker.date.soon(), faker.date.soon())
      ],
      owner: randomUser
    });
    pet.save();

    petArray.push(pet);
  }

  const queryAllUsers = () => {
    //Where User is your mongoose user model
    User.find({}, (err, users) => {
      if (err) {
        console.log(err);
      }
      users.map((user) => {
        if (user.owner) {
          user.ownedPets = randomElements(petArray);
        }
        user.favPets = randomElements(petArray);
        user.favUsers = randomElements(userIdArray);
        user.events = [
          randomEvents(faker.date.recent(), faker.date.recent()),
          randomEvents(faker.date.recent(), faker.date.soon()),
          randomEvents(faker.date.soon(), faker.date.soon())
        ];
        user.save();
      });
    });
  };
  queryAllUsers();

  await User.countDocuments({}, function (err, count) {
    console.log('Number of users:', count);
  });
  await Pet.countDocuments({}, function (err, count) {
    console.log('Number of pets:', count);
  });
};

dbReset();
