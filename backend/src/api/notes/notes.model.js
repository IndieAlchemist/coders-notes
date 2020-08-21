const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID= Schema.Types.ObjectId

let noteSchema = new Schema({
    title: {
        type: String,
        required: [true]
    },
    description: {
        type: String,
        required: [true]
    },
    content: {
        type: String,
        required: [true]
    },
    author:{
        type:ObjectID,
        ref:'User',
        required:[false]
    }
},{
    collection:'notes'
})

module.exports = mongoose.model('Note', noteSchema);