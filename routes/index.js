var express = require('express');
var router = express.Router();
const messages = [
  {
    text: 'Hi there!',
    title: 'Amando',
    added: new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  },
  {
    text: 'Hello World!',
    title: 'Charles',
    added: new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  },
];
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    messages: messages,
    title: 'The Confessional',
  });
});
router.get('/new', function (req, res, next) {
  res.render('form', {});
});
router.get('/register', function (req, res, next) {
  res.render('register', {});
});
router.get('/login', function (req, res, next) {
  res.render('login', {});
});

router.post('/new', function (req, res, next) {
  const messageText = req.body.message;
  const messagetitle = req.body.name;
  messages.push({
    text: messageText,
    title: messagetitle,
    added: new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  });
  res.redirect('/');
});

module.exports = router;
