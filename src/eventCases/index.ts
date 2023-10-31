import { signUpGame } from "../playing/signUpGame"
import { movePieces } from "../playing/movePieces";
import { EVENTNAME } from "../constants";
import { reJointable } from "../playing/reJointable";
function eventHandle(socket: any) {
    socket.onAny((eventName: string, data: any) => {
        console.log('eventHandle data :: >>', data)
        console.log('eventName', eventName)

        switch (eventName) {
            case EVENTNAME.SIGNUP:
                signUpGame(data, socket);
                break;

            case EVENTNAME.MOVE_PIECES:
                movePieces(data, socket);
                break;

            case EVENTNAME.REJOIN:
                reJointable(data.data, socket);
                break;
        }
    })
}

export default eventHandle
