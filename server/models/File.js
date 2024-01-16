const {Schema, model, ObjectId} = require("mongoose")

const File = new Schema({
    filename : {type: String, required: true, unique: true},
    filetype : {type: String, required: true},
    accessLink : {type: String},
    size: {type: Number, default: 0},
    filepath : {type: String, default: ''},
    date : {type: Date, default: Date.now()},
    isFav : {type : Boolean, default: false},
    user : {type: ObjectId, ref: 'User'},
    parent : {type: ObjectId, ref: 'File'},
    childs : [{type: ObjectId, ref: 'File'}],
})

module.exports = model('File', File);