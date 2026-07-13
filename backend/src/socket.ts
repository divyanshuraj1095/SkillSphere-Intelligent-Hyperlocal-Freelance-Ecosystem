import {Server as HttpServer} from "http";
import {Server} from "socket.io";


export const initializeSocket = (server : HttpServer)=>{
    const io = new Server(server, {
    cors : {
        origin: "http://localhost:5173",
        credentials: true
    }
});

   io.on("connection", (socket)=>{
    console.log("User Connected: ", socket.id);

    socket.on("disconnected", ()=>{
        console.log("User Disconnected: ", socket.id);
    });
});

 return io;
}



