const router= require('express').Router()
const auth= require('../middleware/auth')
const commentCtrl= require('../controllers/commentCtrl')


router.post('/comment', auth, commentCtrl.createComment)

module.exports= router