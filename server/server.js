require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/routes');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  process.env.LOCAL_MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connected to DB!');
  }
);

app.use(express.json());

app.use('/api', route);

app.get('/', (req, res) => {
  res.send('All api calls must be made to /api');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
