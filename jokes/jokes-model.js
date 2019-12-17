const db = require('../database/dbConfig');

module.exports = {
  find,
  findBy,
  findById,
  insert
};

function find() {
  return db('users')
}

function findBy(filter) {
  return db('users')
    .select('id', 'username', 'password')
    .where(filter);
}

function findById(id) {
  return db('users')
  .where({ id })
  .first();
}

async function insert(user) {
  const [id] = await db('users')
  .insert(user);

  return findById(id);
}