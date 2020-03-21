const mongoose = require('mongoose');
const nanoid = require("nanoid");

const config = require('./config');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user1, user2, user3] = await User.create (
    {
      username: 'kotik',
      password: 'kotik',
      displayName: 'Kotik Murlykovich',
      phone: '996705820421',
      token: nanoid()

    },{
      username: 'alex',
      password: 'alex',
      displayName: 'Alexander Smith',
      phone: '9965509739992',
      token: nanoid()

    },{
      username: 'mila',
      password: 'mila',
      displayName: 'Mila Kunis',
      phone: '+789745179338',
      token: nanoid()

    },
  );

  const [cars, computers, furniture] = await Category.create({
    title: 'Cars',
    description: 'Cars'
  }, {
    title: 'Computers',
    description: 'Personal Computers and laptops'
  }, {
    title: 'Furniture',
    description: 'Furniture for home and office'
  });

  await Product.create({
    title: 'Lexus LX-570',
    price: 4000000,
    category: cars,
    image: 'fixtures/lexus.jpg',
    seller: user1,
    description: 'A brand new luxury lexus for sale!',
  }, {
    title: 'Gaming computer',
    price: 70000,
    category: computers,
    image: 'fixtures/pc.png',
    seller: user1,
    description: 'Console peasants brainwashed me and now I am selling my pc to buy a console. Only used id for one month! Overclock options available',
  }, {
    title: 'Gaming Chair',
    price: 1000,
    category: furniture,
    image: 'fixtures/gaming-chair.jpg',
    seller: user1,
    description: 'Will make a discount if bought with the computer :)',
  }, {
    title: 'Mazda CX-5',
    price: 1000000,
    category: cars,
    image: 'fixtures/mazda.png',
    seller: user2,
    description: 'Brand new Mazda for sale',
  }, {
    title: 'Bedroom wardrobe',
    price: 2000,
    category: furniture,
    image: 'fixtures/wardrobe.jpeg',
    seller: user2,
    description: 'Some description',
  }, {
    title: 'King size bed',
    price: 4000,
    category: furniture,
    image: 'fixtures/bed.jpeg',
    seller: user2,
    description: 'Dimensions: 2.5m x 1.9m, never user, no mattress included! ',
  });

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});