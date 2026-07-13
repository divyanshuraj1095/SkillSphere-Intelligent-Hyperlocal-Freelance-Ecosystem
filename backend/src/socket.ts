import {Server as HttpServer} from "http";
import {Server} from "socket.io";
import Message from "./models/Message";


export const initializeSocket = (server : HttpServer)=>{
    const io = new Server(server, {
    cors : {
        origin: "http://localhost:5173",
        credentials: true
    }
});

   io.on("connection", (socket)=>{
    console.log("User Connected: ", socket.id);

   socket.on("joinRoom", (projectId)=>{
    socket.join(projectId);
    console.log(`User ${socket.id} Joined Room: ${projectId}`);
   });
   
   socket.on("message", async(data)=>{
    try{
        const savedMessage = await Message.create({
           projectId: data.projectId,
           sender: data.sender,
           message: data.message
        });
        io.to(data.projectId).emit("receivedMessage", savedMessage);
    }
    catch(err){
        console.log(err);
    }
   });

    socket.on("disconnected", ()=>{
        console.log("User Disconnected: ", socket.id);
    });
});

 return io;
}



