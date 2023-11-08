const mongoose = require('mongoose');

const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to database');
  } catch (err) {
    console.error(`Connection error`, err);
  }
};
module.exports = databaseConnect;
