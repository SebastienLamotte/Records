const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((err) =>
    console.log(`Connection to the database failed! \nError:\n${err}`)
  );
