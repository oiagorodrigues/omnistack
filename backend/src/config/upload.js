const multer = require('multer')
const path = require('path')

module.exports = {
  storage: new multer.diskStorage({
    // diskStorage - para salvar o arquivo dentro do projeto.
    // devemos informar o local onde deve ser armazenado o arquivo
    // e o nome que o arquivo vai receber
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => cb(null, file.originalname)
    
  })
}