const mongoose = require('mongoose')

// schema vai desenhar a tabela, informando quais as colunas que farão parte dela.
const PostSchema = new mongoose.Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: { 
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
