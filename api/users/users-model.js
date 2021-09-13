const db = require("../../data/db-config")

function find() {
  return db("users")
}

function findBy(filter) {
  return find().where(filter)
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {
  return findBy({ user_id })
    .first()
}

/**
  resolves to the newly inserted user { user_id, username }
 */
function add(user) {
  return find()
    .insert(user)
    .then(([id]) => findById(id))
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = { find, findById, findBy, add }