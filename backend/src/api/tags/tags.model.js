const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tagSchema = new Schema({
    tagName: {
        type: String,
        required: [true]
    },
},{
    collection:'tags'
})

module.exports = mongoose.model('Tag', tagSchema);