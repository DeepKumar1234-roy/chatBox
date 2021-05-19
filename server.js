const express = require('express')
const app = express()
const mongoose = require('mongoose');
//sconst io = require('socket.io')(3000)
const mongoDB = 'mongodb+srv://Deep:Deep1234@cluster0.pq1ka.mongodb.net/chatBox?retryWrites=true&w=majority';
const Msg = require('./models/messages');
const http = require('http').createServer(app)

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected')
}).catch(err => console.log(err))


const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket
const io = require('socket.io')(http)

io.on('connection', (socket) => {
  //io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})
