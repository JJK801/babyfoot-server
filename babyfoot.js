console.log('Starting application');

var kernel = require('./kernel.js'),
    io     = require('socket.io').listen(kernel.server);

// App configuration for Socket.io

kernel.app.configure(function () {
    io.set("log level", 2);
});

kernel.app.configure('production', function () {
    io.set("log level", 1);
})

// Socket.io

io.sockets.on('connection', function (socket) {    
   
});