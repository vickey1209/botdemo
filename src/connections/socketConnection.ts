import {Socket} from 'socket.io'
import { io } from '..'
import  eventHandle  from '../eventCases'
import  {redisClient}  from '../connections/redisConnection'

const socketConnection=async()=>{
    try{
        io.on('connection',async (socket:any)=>{
            console.log(`${socket.id} connected`)
           eventHandle(socket);
            socket.on("disconnect",(reson:any)=>{
                console.log(`socket disconnected ${reson}`)
            })
        })
    }catch(error:any){
        console.log(`Error socketConnection ${error}`)
    }
}

export {socketConnection}
