import rediskeys from "../constants/rediskeys";
import { get, set } from "../redisOperations";
import EVENTS from '../handleEmmiter';
import { EVENTNAME, REDISKEYS } from "../constants";
import { userTurnStarted } from '../playing/userTurnStarted'
import { checkWinner } from "./checkWinner";


const movePieces = async (movedata: any, socket: any) => {
    try {
        console.log('MOVE_PIECES data :: >>',socket.userId, movedata)

        let movetable = await get(`${rediskeys.TABLES}:${movedata.data.tableId}`)
        console.log('movetable :: >> ', movetable)
        if (movetable) {
            let signIndex = movetable.playerInfo.findIndex((userObject: any) => userObject._id == socket.userId)
            console.log('movetable.playerInfo :: >>', movetable.playerInfo)

            console.log('signIndex=----------', signIndex)

            let id = parseInt(movedata.data.id.charAt(1))
            console.log('movetable.playerInfo[signIndex]', movetable.playerInfo[signIndex])
            movetable.board[id] = movetable.playerInfo[signIndex].sign;

            await set(`${rediskeys.TABLES}:${movedata.data.tableId}`, movetable)
            let updatetable = await get(`${REDISKEYS.TABLES}:${movedata.data.tableId}`)
            let previousTurn = null
            updatetable.playerInfo.forEach((element: any) => {
                previousTurn = element._id

            })
            updatetable.currentTurn = previousTurn
            let tableId = movedata.data.tableId
            let data: any = {
                eventName: EVENTNAME.MOVE_PIECES,
                data: {
                    data: updatetable
                }
            }
            console.log('updatetable :: >>> ', updatetable)
            EVENTS.sendToRoom(tableId, data)
            console.log('updatetable.playerInfo ', updatetable.playerInfo[1].isBot)


            let winTable = await checkWinner(updatetable,socket)
            if(winTable === false)
                await userTurnStarted(tableId);
        }
    } catch (error) {
        console.log('movePieces ERROR', error)
    }
}

export { movePieces }
