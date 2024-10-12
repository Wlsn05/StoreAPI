const mongoose = require('mongoose')

//const album = require('./albumModel')
const {Schema} = mongoose

const artistSchema = new Schema ({
  id: {
    type : String,
    require: true,
    unique :true
  },
  name: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true,
  },
  albums: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  }]
})

module.exports = mongoose.model('Artist', artistSchema)