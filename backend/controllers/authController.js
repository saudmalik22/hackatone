const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        if (!req.body?.password) {
            res.json({
                data: [],
                status: "error",
                error: "password is required"
            })
        }
        var hashedPassword = bcrypt.hashSync(req.body?.password, 8);

        let newUser = new User({
            name: req.body?.name,
            email: req.body?.email,
            password: hashedPassword,
            address: req.body?.address,
        })

        const addUser = await newUser.save();
        res.json(
            {
                data: addUser,
                status: "success",
            }
        )
    } catch (error) {
        res.json(
            {
                data: [],
                status: "error",
                error: "error"
            }
        )
    }
}

const login = async (req, res) => {
    try {
        if(!req.body?.email || !req.body?.password){
            res.json({
                data:[],
                status:"error",
                error:"email and password are required"
            })
        }
        const userFound = await User.findOne({email:req.body?.email});
        if(!userFound){
            res.json({
                data:[],
                status:"error",
                error:"user not found"
            })
        }

        const passwordIsValid =bcrypt.compareSync(req.body?.password, userFound.password);
        if(!passwordIsValid){
            res.json({
                data:[],
                status:"error",
                error:"password is invalid"
            })
        }

        const secretKey =process.env.SECRET_KEY;
        var token = jwt.sign({_id:userFound._id,}, secretKey);
        res.json({
            data: {
                token:token,
            },
            status: "success"
        })
    } catch (error) {
        res.json({
            data:[],
            status:"error",
            error:"error"
        })
    }
}

module.exports = {
    register,
    login
}
