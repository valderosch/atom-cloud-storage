const {Schema, model, ObjectId} = require("mongoose")

const File = new File({
    filename : {type: String, required: true, unique: true},
    filetype : {type: String, required: true},
    weight: {type: Number, default: 0},
    isFav : {type : Boolean, default: false}
})

module.exports = model('File', File);