const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require(`${__dirname}/../../models/tourModel`);
const Review = require(`${__dirname}/../../models/reviewModel`);
const User = require(`${__dirname}/../../models/userModel`);

dotenv.config({ path: `${__dirname}/../../config.env` });

// const DB = process.env.DATABASE_LOCAL;
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((docs) => {
    console.log('DB connected successfully');
    // console.log(docs);
  })
  .catch((err) => {
    console.log('Failed connection');
    // console.log(err);
  });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// console.log(process.argv);
const decAct = process.argv[2];

const importDocs = async () => {
  try {
    await Tour.create(tours, {validateBeforeSave: false});
    // await Review.create(reviews, {validateBeforeSave: false});
    // await User.create(users, { validateBeforeSave: false });
    console.log('Import successful');
  } catch (err) {
    console.log(err);
  }
  process.exit();
  // console.log(docs);
};

const deleteDocs = async () => {
  try {
    await Tour.deleteMany();
    // await Review.deleteMany();
    // await User.deleteMany();
    console.log('Deletion successful');
  } catch (err) {
    console.log(err);
  }
  process.exit();
  // console.log(docs);
};

// const getDocs = async ()=>{
//     const docs = await Tour.find();
//     console.log(docs);
// }

if (decAct === '--import') {
  importDocs();
}

if (decAct === '--delete') {
  deleteDocs();
}

// getDocs();
