const Post = require('../models/Post')
const sharp = require('sharp') // plugin para redimensionar imagens
const path = require('path')
const fs = require('fs')

// todo método http é asincrono e é um middleware
module.exports = {
  async index(req, res) {
    // '-createdAt' o sinal de menos (-) indica que os posts serão ordenados de forma decrescente
    const posts = await Post.find().sort('-createdAt')

    return res.json(posts)
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body
    const { filename: image } = req.file

    const [name] = image.split('.')
    const fileName = `${name}.jpg`

    await sharp(req.file.path) // caminho completo da imagem
      .resize(500) // redimensionar a imagem para 500px em largura e altura
      .jpeg({ quality: 70 }) // converter para jpeg e baixar a qualidade para 70%
      .toFile(
        // passar o destino da imagem (ex.: o diretorio 'uploads'),
        // o diretório onde será salvo (ex.: o diretorio 'resized')
        // e o nome do arquivo
        path.resolve(req.file.destination, 'resized', fileName)
      )

    // deleta a imagem original
    fs.unlinkSync(req.file.path)

    const post = await Post.create({
      image: fileName,
      author,
      place,
      description,
      hashtags
    })

    // emitindo as informações do post via websocket
    req.io.emit('post', post)

    return res.json(post)
  }
}
