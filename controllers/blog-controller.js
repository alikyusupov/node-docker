const blogModel = require("../models/blog-model")

const controller = {
    getBlogs: async (req, res, next) => {
        let blogs = []
        try {
            blogs = await blogModel.find();
            res.send({
                status: 'Success',
                data: blogs
            })
        } catch (error) {
            res.send({
                status: 'Fail',
                data: blogs
            })
        }
    },
    createBlog: async (req, res, next) => {
        try {
            const blog = req.body
            await blogModel.create(blog)
            res.send({
                status: 'Success',
            })
        } catch (error) {
            res.send({
                status: 'Fail',
            })
        }
    },
    getBlog: async (req, res, next) => {
        try {
            const id = req.params.id
            const blog = await blogModel.findById(id)
            res.send({
                status: 'Success',
                data: blog
            })
        } catch (error) {
            res.send({
                status: 'Fail',
            })
        }
    },
    updateBlog: async (req, res, next) => {
        try {
            const blog = req.body
            const id = req.params.id
            const updatedBlog = await blogModel.findByIdAndUpdate(id, blog, {new: true})
            res.send({
                status: 'Success',
                data: updatedBlog
            })
        } catch (error) {
            res.send({
                status: 'Fail',
            })
        }
    },
    deleteBlog: async (req, res, next) => {
        try {
            const id = req.params.id
            await blogModel.findByIdAndDelete(id)
            res.send({
                status: 'Success',
            })
        } catch (error) {
            res.send({
                status: 'Fail',
            })
        }
    }
}

module.exports = controller