if (process.env.NODE_ENV !== 'production') require('dotenv').config();

require('../config/index');

const User = require('../models/user'),
  Pet = require('../models/pet'),
  faker = require('faker'),
  mongoose = require('mongoose');

/**
 * @todo
 * There are ways we can run these promises concurrently to speed up the seed process
 * using Promise.all()
 */
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

  for (let i = 0; i < 100; i++) {
    const user = new User({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
      owner: Boolean(Math.round(Math.random())),
      description: faker.lorem.paragraph(),
      avatar: faker.internet.avatar(),
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

  for (let i = 0; i < 100; i++) {
    const randomIndex = Math.floor(Math.random() * allowedTypes.length);
    const randomType = allowedTypes[randomIndex];

    const randomUser =
      userIdArray[Math.floor(Math.random() * userIdArray.length)];

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
      emergency: faker.phone.phoneNumber(),
      links: { url: faker.internet.url(), text: faker.lorem.words() },
      owner: randomUser
    });
    pet.save();

    petArray.push(pet);
  }

  const randomNum = (arr) => {
   return Math.floor(Math.random() * arr.length + 1);
  } 

  const queryAllUsers = () => {
    //Where User is you mongoose user model
    User.find({} , (err, users) => {
        if(err) {console.log(err)}
        users.map(user => {
            user.ownedPets = [petArray[randomNum(petArray)],petArray[randomNum(petArray)],petArray[randomNum(petArray)]];
            user.favPets = [petArray[randomNum(petArray)],petArray[randomNum(petArray)],petArray[randomNum(petArray)]];
            user.favUsers = [userIdArray[randomNum(userIdArray)],userIdArray[randomNum(userIdArray)],userIdArray[randomNum(userIdArray)]]
            user.save()
        })
    })
}
queryAllUsers();

  await User.countDocuments({}, function (err, count) {
    console.log('Number of users:', count);
  });
  await Pet.countDocuments({}, function (err, count) {
    console.log('Number of pets:', count);
  });
};

dbReset();