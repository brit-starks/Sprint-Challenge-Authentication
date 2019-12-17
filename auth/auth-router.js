const express = require('express');
const bcrypt = require('bcryptjs');
const users = require('../jokes/jokes-model');

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
        res.status(200).json({
          message: `Welcome ${user.username}!`,
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

module.exports = router;
