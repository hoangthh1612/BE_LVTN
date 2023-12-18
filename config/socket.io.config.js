const { Server, Socket } = require("socket.io");
const { jwtAuthSocketIO } = require("../middleware/socket.io.auth");

let io;
let connectionUserList = [];
module.exports = {
  init: function (server) {
    io = new Server(server, {
      cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST"],
        allowedHeaders: ["token"],
        // allowedHeaders: ["<header-name>[, <header-name>]*"], 
        // allowedHeaders: true,
        credentials: true,
      },
    });
    io.use(jwtAuthSocketIO);
    
    return io;
  },
  getIO: function () {
    if (!io) {
      throw new Error("Can't get io instance before calling .init()");
    }
    return io;
  },
  connectedUser: connectionUserList,
};
