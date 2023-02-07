const userModel = require('../model/userModel');

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
        if (!isValid(userName)) return res.status(400).send({ status: false, msg: "please Enter email" })
        if (!isValid(password)) return res.status(400).send({ status: false, msg: "please Enter Password" })

        let user = await userModel.findOne({ $and: [{ email: userName }, { password: password }] })
        if (!user) {
            await userModel.create(content);
        }
        let data = await userModel.findOne({ $and: [{ email: userName }, { password: password }] })

        res.status(200).send({ status: true, msg: "log in successfull", data: data })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ error: err.message })
    }

}

const updateUser = async function (req, res) {
    try {
        let content = req.body;
        let userName = content.email
       const data = await userModel.findOneAndUpdate({ email: userName }, { coordinate: content.coordinate }, { new: true });
console.log(data)
        res.status(201).send({ status: true, data: data })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ error: err.message })
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
        res.status(500).send({ error: err.message })
    }

}




module.exports = { loginUser, updateUser ,fetchUser}