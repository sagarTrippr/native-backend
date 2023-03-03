const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.get('/', "App is running fine")
router.post('/login', userController.loginUser)
router.put('/update', userController.updateUser)
router.post('/fetch', userController.fetchUser)
router.get('/fetchAll', userController.fetchAllUser)





module.exports = router;