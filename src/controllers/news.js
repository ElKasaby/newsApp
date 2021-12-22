const News = require('../models/news')

const addNews = async(req,res)=>{
    try{
        const news = new News({
            title: req.body.title,
            description: req.body.description,
            reporter: req.user._id
        })
        await news.save()
        res.status(200).send(news)
    }
    catch(e){
        res.status(400).send(e.message)
    }
}

const getNews = async(req,res)=>{
    try{
        const _id = req.params.id
        const news = await News.findById(_id).populate('reporter')
        if(!news){
            return res.status(404).send("This news not found")
        }else if(!news.reporter.equals(req.user._id)){
            return res.status(401).send('Not Authrization')
        }
        res.status(200).send(news)
    }
    catch(e){
        res.status(404).send(e.message)
    }
}

const allNews = async(req,res)=>{
    try{
        const news = await News.find({reporter: req.user._id}).populate('reporter')
        if(!news){
            return res.status(404).send("No news found for this user")
        }
        res.status(200).send(news)
    }
    catch(e){
        res.status(404).send(e.message)
    }
}

const editNews = async(req,res)=>{
    const updata = Object.keys(req.body)
    const alloweUpdatas = ['title','description']

    let isValid = updata.every((el)=>alloweUpdatas.includes(el))
     if(!isValid){
         return res.status(400).send("Can't updata plz, cheack your edit key")
     }

    try{    
        const _id = req.params.id
        const news = await News.findById(_id)
        if(!news){
            return res.status(404).send('No news is found')
        }else if(!news.reporter.equals(req.user._id)){
            return res.status(401).send('Not Authrization')
        }
        updata.forEach((el)=>(news[el]=req.body[el]))
        await news.save()
        res.status(200).send(news)
    }
    catch(e){
        console.log(e.message);
    }
}

const newsDelete = async(req,res)=>{
    try{
        const _id = req.params.id
        const news = await News.findById(_id)
        if(!news){
            return res.status(404).send("news not found")
        }else if(!news.reporter.equals(req.user._id)){
            return res.status(401).send('Not Authrization')
        }
        await News.findByIdAndDelete(_id)
        res.status(200).send("Delete Sucssfly")
    }
    catch(e){
        res.status(500).send(e)
    }
}


const imageNews = async(req,res)=>{
    try{
        const _id = req.params.id
        const news = await News.findById(_id)
        if(!news){
            return res.status(404).send("news not found")
        }else if(!news.reporter.equals(req.user._id)){
            return res.status(401).send('Not Authrization')
        }
        news.image = req.file.buffer
        await news.save()
        res.status(200).send(news)
    }
    catch(e){
        res.status(400).send(e.message)
    }
}

module.exports = {
    addNews,
    getNews,
    allNews,
    editNews,
    newsDelete,
    imageNews
}