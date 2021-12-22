const express = require('express')
const auth = require('../middelware/auth')
const router = new express.Router()
const userControllers = require('../controllers/user')
const uploads = require('../multer')

router.post('/signUp',userControllers.userSignUp)

router.post('/login',userControllers.userLogin)

router.get('/usersProfile',auth,userControllers.userProfile)

router.patch('/users/:id',auth,userControllers.userUpdate)

router.delete('/logout',auth,userControllers.userLogout)

router.delete('/logoutall',auth,userControllers.userLogoutAll)

router.delete('/users/:id',auth,userControllers.userDelete)

router.post('/profile/image',auth,uploads.single('image'),userControllers.userImage)



module.exports = router
