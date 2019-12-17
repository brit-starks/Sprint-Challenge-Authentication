const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = require('../jokes/jokes-model');
const secrets = require('../config/secrets');
const router = express.Router();

router.post('/register', (req, res) => {
let user = req.body;

const hash = bcrypt.hashSync(user.password, 10);
user.password = hash;

  users.insert(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch( err => {
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.headers;

  users.findBy({ username })
  .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

        const token = generateToken(user);

        req.session.user = user;
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({
          message: 'Invalid Credentials'
        })
      }
    })
    .catch( err => {
      res.status(500).json({
        err, 
        message: 'Opps, something is wrong here..'
      });
    });
});

function generateToken(user) {

  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
