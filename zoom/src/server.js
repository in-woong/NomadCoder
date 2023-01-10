// import WebSocket from 'ws';
import http from 'http';
import express from 'express';

const { Server } = require('socket.io');
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on('connection', (socket) => {
  socket.on('enter_room', (roomName, done) => {
    console.log(roomName);
    setTimeout(() => {
      done();
    }, 15000);
  });
});

// const wsServer = new WebSocket.Server({ server });

// const sockets = [];
// wsServer.on('connection', (socket) => {
//   sockets.push(socket);
//   socket['nickname'] = 'Anon';
//   console.log('Connected to Browser ✅');
//   socket.on('close', () => console.log('Disconnected from the Browser ❌'));
//   socket.on('message', (message) => {
//     const { type, payload } = JSON.parse(message);
//     switch (type) {
//       case 'new_message':
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}: ${payload}`)
//         );
//         break;
//       case 'nickname':
//         socket['nickname'] = payload;
//         break;
//     }
//   });
// });
const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
