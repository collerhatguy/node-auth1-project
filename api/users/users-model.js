const db = require("../../data/db-config")

function find() {
  return db("users")
}

function findBy(filter) {
  return find().where(filter)
}

function findById(user_id) {
  return findBy({ user_id })
    .first()
}

function add(user) {
  return find()
    .insert(user)
    .then(([id]) => findById(id))
}

module.exports = { find, findById, findBy, add }