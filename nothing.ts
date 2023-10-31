import { tableFormat, userFormat } from "../defaultFromat/defaultUser";
import { set, get } from "../redisOperations";
import { EVENTNAME, REDISKEYS } from "../constants";
import Events from '../handleEmmiter';
import { botFormat } from "../bot/botFormat";
import bull from "../bull";
import eventName from "../constants/eventName";

const signUpGame = async (signupData: any, socket: any) => {
    try {
        console.log('signUpGame data :: >>', signupData)
        signupData.socketId = socket.id
        let userDefault: any = userFormat(signupData)
        await set(`${REDISKEYS.PLAYERS}:${userDefault._id}`, userDefault)
        let getUser = await get(`${REDISKEYS.PLAYERS}:${userDefault._id}`)
        let gameTableDefaultFormat = await tableFormat(getUser)
        await set(`${REDISKEYS.TABLES}:${gameTableDefaultFormat?._id}`, gameTableDefaultFormat)
        let table = await get(`${REDISKEYS.TABLES}:${gameTableDefaultFormat?._id}`)

        socket.join(table._id)
        socket.userId = getUser._id;
        socket.tableId = gameTableDefaultFormat?._id;
        let roomData: any = {
            eventName: EVENTNAME.SIGNUP,
            data: {
                playerInfo: table.playerInfo,
                userId: getUser._id,
                board: table.board
            }
        }
        let botdefault: any = await botFormat(signupData)
        await set(`${REDISKEYS.PLAYERS}:${botdefault._id}`, botdefault)
        table.playerInfo.push(botdefault)
        await set(`${REDISKEYS.TABLES}:${gameTableDefaultFormat?._id}`, table)
        socket.join(table._id)
        Events.sendToRoom(table._id, roomData)
        let firstPlayer = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
        bull.addJob.delayTimer({
            time: 7000,
            jobId: table._id,
            tableId: table._id,
            currentturn: firstPlayer,
        })

        let roomValidateData = {
            eventName: eventName.START,
            data: {
                currentturn: firstPlayer,
                pieceColor: table.playerInfo[0].pieceColor,
                tableId: table._id,
                roundTimer: 5
            },
        };
        Events.sendToRoom(table._id, roomValidateData)
    }
    catch (error) {
        console.log('joinGame ERROR', error)
    }
}

export { signUpGame }
