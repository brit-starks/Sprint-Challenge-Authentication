const db = require('../database/dbConfig');

module.exports = {
  find,
  findById,
  insert,
  findBy
};

function find() {
  return db('users')
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

function findBy(filter) {
  return db('users')
    .where(filter);
}