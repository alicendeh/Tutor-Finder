// const io = require('socket.io')(8900, {
//   cors: {
//     origin: 'http://localhost:3000 ',
//   },
// });

// let users = [];

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };
// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   //take user id and socket id from client
//   socket.on('addUser', (userId) => {
//     addUser(userId, socket.id);
//     io.emit('getUsers', users);
//   });

//   //send and msgs
//   socket.on('sendMessage', async ({ receiverId, text }) => {
//     try {
//       const user = await getUser(receiverId);
//       console.log('user ' + user);
//       await io.to(user.socketId).emit('getMessage', {
//         text,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//     removeUser(socket.id);
//     io.emit('getUsers', users);
//   });
// });

const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  //when ceonnect
  console.log('a user connected.');

  //take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  //send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(user);
    io.to(user.socketId).emit('getMessage', {
      //   senderId,
      text,
    });
  });

  //when disconnect
  //   socket.on('disconnect', () => {
  //     console.log('a user disconnected!');
  //     removeUser(socket.id);
  //     io.emit('getUsers', users);
  //   });
});