import { EVENTNAME, REDISKEYS } from "../constants";
import { get } from "../redisOperations";
import Events from '../handleEmmiter';

const reJointable = async (reJoinData: any, socket: any) => {
    try {
        let userId = reJoinData.userId
        let tableId = reJoinData.tableId
        if (userId && tableId) {
            let user = await get(`${REDISKEYS.PLAYERS}:${userId}`)
            let table = await get(`${REDISKEYS.TABLES}:${tableId}`)
            socket.join(table._id)
            socket.userId = userId
            socket.tableId = tableId
            let roomData: any = {
                eventName: EVENTNAME.JOIN,
                data: {
                    playerInfo: table.playerInfo,
                    userId: userId,
                    board: table.board,
                    tableId: table._id
                }
            }

         
            Events.sendToRoom(table._id, roomData)

            let userTurnData = {

            }

            let resTableData: any = {
                eventName: EVENTNAME.USER_TURN_STARTED,
                data: {
                    curretTurn: table.currentTurn, userId: userId
                }
            }
            Events.sendToRoom(table._id, resTableData)
        }
    } catch (error) {
        console.log('reJointable ERROR :: >>', error);
    }
}

export { reJointable }
