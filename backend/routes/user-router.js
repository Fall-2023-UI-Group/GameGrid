const express = require('express')
const UserCtrl = require('../controllers/user-ctrl.js')
const router = express.Router()

router.post('/createUser', UserCtrl.createUser)
router.post('/signIn', UserCtrl.signIn)



module.exports = router