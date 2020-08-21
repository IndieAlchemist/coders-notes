const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID= Schema.Types.ObjectId

let ratingsSchema = new Schema({
    like: {
        type: Boolean,
        required: [true]
    },
    user:{
        type:ObjectID,
        ref:'User',
        required:[true]
    },
    note:{
        type:ObjectID,
        ref:'Note',
        required:[true]
    }
},{
    collection:'Ratings'
})

module.exports = mongoose.model('Rating', ratingsSchema);