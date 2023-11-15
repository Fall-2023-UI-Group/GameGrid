const express = require('express')
const GameCtrl = require('../controllers/game-ctrl.js')
const router = express.Router()

router.get('/getGames', GameCtrl.getGames)


module.exports = router