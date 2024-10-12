const mongoose = require('mongoose')
const {Schema} = mongoose

const albumSchema = new Schema ({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title : {
    type: String,
    required: true,
  },
  releaseDate : {
    type: Date,
    required: true
  },
  genre: {
    type: String,
    required: false
  },
  artists : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }
})

module.exports = mongoose.model('Album', albumSchema)