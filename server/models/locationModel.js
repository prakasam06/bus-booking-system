const mongoose = require('mongoose')

const locationSchema = new mongoose.schema({
    name : {
        type: String,
        required: [true,'location name is required']
    }
})

module.exports = mongoose.model("Location", locationSchema);