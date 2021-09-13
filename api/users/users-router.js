const { restricted } = require("../auth/auth-middleware")
const { find } = require("./users-model")
const router = require("express").Router()

router.get("/", restricted, (req, res, next) => {
  find().then(users => {
    res.status(200).json(users)
  }).catch(next)
})

module.exports = router