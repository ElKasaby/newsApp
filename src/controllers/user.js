const User = require('../models/user')

const userSignUp = async(req,res)=>{
    try{
        const user = new User(req.body)
        const token = await user.generateToken()
        await user.save()
        res.status(200).send({user,token})
    }
    catch(e){
        res.status(400).send(e.message)
    }
}

const userLogin = async(req,res)=>{                                                                                                                                                          
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateToken()

        res.status(200).send({user,token})
    }
    catch(e){
        res.status(500).send(e.message)
    }
}

const userProfile = async(req,res)=>{
  try{
      res.status(200).send(req.user)
  }
  catch(e){
      res.status(404).send(e.message)
  }
}

const userUpdate = async(req,res)=>{
    const updata = Object.keys(req.body)
    const alloweUpdatas = ['name','age','phone','image','password']

    let isValid = updata.every((el)=>alloweUpdatas.includes(el))
     if(!isValid){
         return res.status(400).send("Can't updata plz, cheack your edit key")
     }

    try{    
        const id = req.params.id
        const user = await User.findById(id)
        if(!user){
            return res.status(404).send('No user is found')
        }
        updata.forEach((el)=>(user[el]=req.body[el]))
        await user.save()
        res.status(200).send(user)
    }
    catch(e){
        console.log(e.message);
    }
}

const userLogout = async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((el)=>{
            return el !== req.token
        })
        await req.user.save()
        res.status(200).send('Logout successfully')

    }
    catch(e){
        res.status(500).send(e.message)
    }
}

const userLogoutAll = async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).send('Logout all success')
    }
    catch(e){
        res.status(500).send(e.message)
    }
}

const userDelete = async(req,res)=>{
    try{
        const id = req.params.id
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).send("user not found")
        }
        res.status(200).send("Delete Sucssfly")
    }
    catch(e){
        res.status(500).send(e)
    }
}

const userImage = async(req,res)=>{
    try{
        req.user.image = req.file.buffer
        await req.user.save()
        res.status(200).send(req.user)
    }
    catch(e){
        res.status(400).send(e.message)
    }
}

module.exports = {
    userImage,
    userDelete,
    userLogoutAll,
    userLogout,
    userUpdate,
    userLogin,
    userSignUp,
    userProfile
}