const app = require("express")();
const httpServer = require("http").createServer(app);
// 引入socket.io并立即实例化，把server挂载上去
const options = { cors: true }; //参数
const io = require("socket.io")(httpServer, options);

const users = []

io.on("connection", socket => {
  socket.on('login', data => {
    users.push(data)
    console.log(users)
    socket.emit('loginSuccess', {code: 1, msg:'登陆成功', data})
    io.emit('addUser', data)
    io.emit('userList', users)
    socket.username = data.username
  })
  socket.on('disconnect', () => {
    users.splice(users.findIndex(item => item.username === socket.username), 1)
    io.emit('delUser', socket.username)
    io.emit('userList', users)
  })
  socket.on('sendMsg', data => {
    io.emit('monitorMsg', data)
  })
});

httpServer.listen(3100, () => {
  console.log('服务端启动成功，端口3100！')
});
// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
