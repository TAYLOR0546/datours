const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

process.on('uncaughtException', err=> {
  console.log('UNCAUGHT REJECTION! *** Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true, //this is the code I added that solved it all
  keepAlive: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  useFindAndModify: false,
  useUnifiedTopology: true,
  createIndexes: true
}

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// console.log(process.env.DATABASE_LOCAL);
// mongoose.connect(DB, {
mongoose
  .connect(
    DB,
    // process.env.DATABASE_LOCAL,
    // options
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log('DB connection successful'))
  // .catch(err => console.log('ERROR'));
// }).then(con => console.log(con.connections));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! *** Shutting down...');
  console.log(err.name, err.message);
  server.close(()=>{
    process.exit(1);
  });
});

// process.on('uncaughtException', err=> {
//   console.log('UNCAUGHT REJECTION! *** Shutting down...');
//   console.log(err.name, err.message);
//   server.close(()=>{
//     process.exit(1);
//   });
// });

