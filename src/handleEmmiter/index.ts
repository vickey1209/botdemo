import { io } from "..";


class Events {
    sendToRoom(tableId: string, data: any) {
        try {

            console.log('sendToRoom data :: >>', data)
            console.log('sendToRoom tableId :: >>', tableId)

            io.to(tableId).emit(data.eventName, data)
        }
        catch (error) {
            console.log('sendToRoom error', error)
        }
    }
    SendToSocket(socketId: string, data: any) {
        try {
            io.to(socketId).emit(data.eventName, data)

        } catch (error) {
            console.log("CATCH_ERROR IN SendToSocket : ", error)
        }
    }
}

export = new Events()
