const { Router } = require("express")

const controller = require("../controllers/blog-controller")

const auth = require("../middleware/auth-middleware")

const router = new Router()

router.route('/').get(controller.getBlogs).post(auth, controller.createBlog)

router.route('/:id').get(controller.getBlog).patch(controller.updateBlog).delete(controller.deleteBlog)

module.exports = router

