require('dotenv').config();
const express = require('express');
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors');
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000
const userRouter = require('./routes/user')

const app = express();
const server = http.createServer(app);
const io = socketio(server)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

io.on('connection', (socket) => {
    console.log('we have a new connection')
    socket.on('disconnnect', () => {
        console.log('User left');
    })
})

app.use("/user", userRouter)


server.listen(PORT, () => {
    mongoose.connect(process.env.URI)
        .then(() => {
            console.log("Connected with mongodb")
        });
    console.log(`server is running on ${PORT}`)
})