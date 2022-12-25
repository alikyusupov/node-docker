const userModel = require("../models/user-model")

const { hash, compare } = require('bcryptjs')

const userController = {
    createUser: async (req, res, next) => {
        try {
            const { name, password } = req.body
            const user = await userModel.findOne({username: name})
            if(user) {
                return res.status(401).json({
                    status: "Bad request",
                    data: 'User already exists'
                })
            }
            const hashPwd = await hash(password, 12)
            const newuser = await userModel.create({
                name,
                password: hashPwd
            })
            res.status(201).json({
                status: 'Success',
                data: newuser
            })
        } catch (error) {
            console.log(error);
            res.send({
                status: 'Fail',
            })
        }
    },
    loginUser: async (req, res, next) => {
        try {
            const { name, password } = req.body
            const user = await userModel.findOne({name})
            if(!user) {
                return res.status(404).json({
                    status: "not found",
                    data: 'User not found'
                })
            }
            const isMatch = await compare(password, user.password)
            if(isMatch){
                return res.status(201).json({
                    status: 'Success',
                    data: 'Successfully logged in'
                })
            }
            return res.status(403).json({
                status: 'Forbidden',
                data: 'Password is wrong'
            })
        } catch (error) {
            res.send({
                status: 'Fail',
            })
        }
    },
}

module.exports = userController