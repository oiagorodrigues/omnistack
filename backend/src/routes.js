const express = require('express')
const multer = require('multer'); // serve para tratar arquivos form-data multipart
const uploadConfig = require('./config/upload')
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store); // upload.single - utilizado quando apenas um arquivo é enviado por requisição

routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;