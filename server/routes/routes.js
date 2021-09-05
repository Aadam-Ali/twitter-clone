const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const verify = require('../middleware/verify');

const Tweet = require('../model/Tweet');
const User = require('../model/User');

router.get('/', (req, res) => {
  res.send('Welcome to Twitter Clone Backend!');
});

router.post('/register', async (req, res) => {
  const userExist = await User.findOne({ username: req.body.username });
  if (userExist) return res.status(400).send('Username is taken!');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });

  try {
    const registeredUser = await user.save();
    res.send(registeredUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) res.status(400).send('Username or Password invalid!');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) res.status(400).send('Username or Password invalid!');

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.TOKEN_SECRET
  );

  res.json({ id: user._id, username: user.username, accessToken: token });
});

router.post('/jwtLogin', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
      if (err) {
        console.log(err);
        return res.status(403).json('Invalid Token!');
      }

      res.send(payload);
    });
  }
});

router.delete('/:id', verify, (req, res) => {
  if (req.user.id === req.params.id) {
    User.findOneAndDelete({ _id: req.params.id }, function (err) {
      if (err) console.log(err);
    });
    res.send('User deleted successfully!');
  } else {
    res.status(401).send('Not allowed to delete this user!');
  }
});

router.post('/tweet', verify, async (req, res) => {
  const tweet = new Tweet({
    content: req.body.content,
    username: req.body.username,
    date: new Date(),
  });

  try {
    const savedTweet = await tweet.save();
    res.send(savedTweet);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/tweets', async (req, res) => {
  const tweets = await Tweet.find();
  res.send(tweets);
});

router.get('/tweets/:username', async (req, res) => {
  const tweets = await Tweet.find({ username: req.params.username });
  res.send(tweets);
});

module.exports = router;
