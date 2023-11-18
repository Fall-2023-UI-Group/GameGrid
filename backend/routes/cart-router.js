const express = require('express')
const CartCtrl = require('../controllers/cart-ctrl.js')
const router = express.Router()

router.get('/getCart', CartCtrl.getCart)


module.exports = router