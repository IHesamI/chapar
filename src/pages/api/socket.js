import {Server} from 'socket.io';
export const SocketHandler = (rqe, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running');
    }
    else {
        console.log('Socket is initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io=io
        io.on('connection',socket=>{
            socket.on('message',msg=>{
                socket.broadcast.emit('update-message',msg)
            })
        })
    }
    res.end();

}
export default  SocketHandler