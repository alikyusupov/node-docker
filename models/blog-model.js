const  { model, Schema } = require("mongoose")

const blogSchema = new Schema({
    title: {
        required: [true, 'Title must have value'],
        type: String
    },
    body: {
        required: [true, 'Body must have value'],
        type: String
    }
})

const blogModel = model('Blog', blogSchema)

module.exports = blogModel