const router = require('express').Router()
const auth = require("../middleware/auth")
const userCtrl = require("../controllers/userCtrl")

router.get('/search', auth, userCtrl.searchUser)
router.get('/user', auth, userCtrl.getUser)
module.exports=router