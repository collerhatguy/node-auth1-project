// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const { checkUsernameFree, checkUsernameExists, checkPasswordLength } = require("./auth-middleware")
const { add } = require("../users/users-model")
const bcrypt = require("bcryptjs")
const server = require("../users/users-router")
const router = require("express").Router()

router.post("/register", checkUsernameFree, checkPasswordLength, (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)
  add({ username, password: hash }).then(user =>
    res.status(200).json(user)
  ).catch(next)
})

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
*/
router.post("/login", checkUsernameExists, checkPasswordLength, (req, res, next) => {
  const { body, possibleAccounts } = req
  const account = possibleAccounts.find(a => 
    bcrypt.compareSync(body.password, a.password)
  )
  account 
    ? res.status(200).json({ message:"Welcome sue!" })
    : next({ status: 401, message: "Invalid credentials" })
})

/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
*/

server.get("/logout", (req, res) => {
  req.session 
    ? res.status(200).json({ message: "logged out" })
    : res.status(200).json({ message: "no session" })
})

module.exports = server
// Don't forget to add the router to the `exports` object so it can be required in other modules
