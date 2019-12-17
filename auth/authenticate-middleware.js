const users = require('../jokes/jokes-model');
const bcrypt = require('bcryptjs');

module.exports = (req,res,next) => {
  const { username, password } = req.headers

  users.findBy({ username })
  .first()
  .then( _user=>{
  if( _user && bcrypt.compareSync(password, _user.password ))
  {
  next()
  } else {
      res.status(401).json({message: 'Invalid Credentials'})
  }
  })
  .catch( err => res.status(500).json({message: err}) )
} 