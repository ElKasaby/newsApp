const express = require('express')
const auth = require('../middelware/auth')
const router = new express.Router()
const newsControllers = require('../controllers/news')
const uploads = require('../multer')


router.post('/addNews',auth,newsControllers.addNews)

router.get('/news/:id',auth,newsControllers.getNews)

router.get('/allNews',auth,newsControllers.allNews)

router.patch('/editNews/:id',auth,newsControllers.editNews)

router.delete('/deleteNews/:id',auth,newsControllers.newsDelete)

router.post('/imageNews/:id',auth,uploads.single('image'),newsControllers.imageNews)


module.exports = router