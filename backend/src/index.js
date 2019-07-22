const path = require('path');
const express = require('express'); // lida com rotas, parametros e requisições da aplicação
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// configurando o servidor para suportar requisições via protocolo
// http e websocket
const server = require('http').Server(app)
const io = require('socket.io')(server)

// mongodb atlas
mongoose.connect( 'mongodb+srv://iago:admin123@cluster0-qnlg0.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

app.use((req, res, next) => {
  // configurando um middleware para disponibilizar
  // o websocket em todas as rotas e requisições,
  // assim, as aplicações conectadas nesse sistema, poderá ter acesso as informações
  // enviadas (quando configuradas para serem emitidas) em tempo real.
  // VER OS CONTROLLERS PARA EXEMPLO DE COMO EMITIR AS INFORMAÇÕES VIA WEBSOCKET
  req.io = io;

  next();
})

app.use(cors())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'));

server.listen(3333);
