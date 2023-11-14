const express = require('express')
const UserCtrl = require('../controllers/user-ctrl.js')
const router = express.Router()

router.post('/createUser', UserCtrl.createUser)


module.exports = router