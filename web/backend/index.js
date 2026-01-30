import dotenv from 'dotenv';
dotenv.config({
    path: '../.env'
})

import { app } from "./app.js";
import connectDb from "../Db/DbConfig.js";
import { Server } from "socket.io";
import { createServer } from 'node:http';

connectDb()

const server = createServer(app);

const io = new Server(server,{
    pingTimeout: 60000,
    cors:{ 
        origin: '*',
        methods: ["GET", "POST"]
     },
});

app.set('io', io);

io.on('connection',(socket) => {
    console.log('Client connected', socket.id)

    socket.on('updateLocation', (data)=>{
        console.log("Received location update:", data);
        console.log(`Location updated: `, data)
        io.emit('locationUpdate', data)
    })

    socket.on('disconnect',()=>{
        console.log('Client disconnected')
    })
})



server.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server connected at port ${process.env.PORT}`)
})