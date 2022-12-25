const { Router } = require("express")

const userController = require("../controllers/user-controller")

const router = new Router()

router.route('/signup').post(userController.createUser)

router.route('/login').post(userController.loginUser)

module.exports = router