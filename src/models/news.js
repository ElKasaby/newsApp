const mongoose = require('mongoose')


const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    
    timestamps: { currentTime: () =>new Date().setHours(new Date().getHours() + 2) }
};
const newsSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    reporter:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    image:{
        type: Buffer
    }
},
// { timestamps: true }
opts
)

const News = mongoose.model('News',newsSchema)

module.exports = News