const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const validator = require("validator");
const saltRounds = 10;

const isValid = function (value) {
    if (typeof value == 'undefined' || typeof value == null) return false;
    if (typeof value == 'string' && value.trim().length == 0) return false;
    return true
}


const loginUser = async function (req, res) {
    try {
        let content = req.body;
        let userName = content.email
        let password = content.password
        if (!isValid(userName)) return res.status(400).send({ status: false, message: "please Enter email" })
        if (!isValid(password)) return res.status(400).send({ status: false, message: "please Enter Password" })
        if (!validator.isEmail(userName))
            return res
                .status(400)
                .send({ status: false, message: `${userName} email is not valid` });
        let user = await userModel.findOne({ email: userName })
        if (!user) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            let cred = await userModel.create({ email: userName, password: hash });
            res.status(200).send({ status: true, message: "log in successfull", data: cred })
        } else {
            let decrypt = bcrypt.compareSync(password, user.password);
            if (decrypt) {
                res.status(200).send({ status: true, message: "log in successfull", data: user })
            } else {
                res.status(200).send({ status: false, message: "Wrong Password Try Again" })
            }
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: err.message })
    }

}

const updateUser = async function (req, res) {
    try {
        let content = req.body;
        let userName = content.email
        const data = await userModel.findOneAndUpdate({ email: userName }, { lat: content.lat, long: content.long }, { new: true });
        // console.log(data)
        res.status(201).send({ status: true, data: data })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: err.message })
    }

}
const fetchUser = async function (req, res) {
    try {
        let content = req.body;
        let userName = content.email
        const data = await userModel.findOne({ email: userName });
        res.status(201).send({ status: true, data: data })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: err.message })
    }

}
const fetchAllUser = async function (req, res) {
    try {
        const data = await userModel.find();
        res.status(201).send({ status: true, data: data })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: err.message })
    }

}




module.exports = { loginUser, updateUser, fetchUser, fetchAllUser }