const { findBy } = require("../users/users-model")

function restricted(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    next({ status: 401, message: "You shall not pass!" })
  }
}

function checkUsernameFree(req, res, next) {
  const { username } = req.body
  findBy({ username }).then(accounts => {
    accounts.length 
      ? next({ status: 422, message: "Username taken" }) 
      : next()
  })
}

function checkUsernameExists(req, res, next) {
  const { username } = req.body
  findBy({ username }).then(accounts => {
    if (accounts.length) {
      req.possibleAccounts = accounts
      next()
    }
    next({ status: 401, message: "Invalid credentials" })
  })
}

function checkPasswordLength(req, res, next) {
  const { password } = req.body
  !password && next({ status: 422, message: "Password must be longer than 3 chars" })
  password.length < 3 && next({ status: 422, message: "Password must be longer than 3 chars" })
  next()
}

module.exports = {
  restricted, 
  checkPasswordLength, 
  checkUsernameExists, 
  checkUsernameFree
}