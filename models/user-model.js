const  { model, Schema } = require("mongoose")

const userSchema = new Schema({
    name: {
        required: [true, 'Name must have value'],
        type: String,
        unique: true
    },
    password: {
        required: [true, 'Password must have value'],
        type: String
    }
})

const userModel = model('User', userSchema)

module.exports = userModel