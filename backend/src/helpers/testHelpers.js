const { Model } = require("mongoose");

const prePopulate = async (Model, document)=>{
    const {_id}= await new Model(document).save();
    return _id;
}

module.exports={
    prePopulate,
}