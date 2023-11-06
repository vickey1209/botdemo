import { tableFormat, userFormat } from "../defaultFromat/defaultUser";
import { set, get } from "../redisOperations";
import { EVENTNAME, REDISKEYS } from "../constants";
import Events from '../handleEmmiter';
import { botSignUp } from "../bot/botSignUp";
import bull from "../bull";
import eventName from "../constants/eventName";


const signUpGame = async (signupData: any, socket: any) => {
    try {
        console.log('signUpGame data :: >>', signupData)
        signupData.socketId = socket.id
        let userDefault: any = userFormat(signupData)
        await set(`${REDISKEYS.PLAYERS}:${userDefault._id}`, userDefault)
        let getUser = await get(`${REDISKEYS.PLAYERS}:${userDefault._id}`)
        console.log("getuser=========>>>>", getUser);
        if (getUser) {
            socket.userId = getUser._id;
            let userData: any = {
                eventName: EVENTNAME.SIGNUP,
                data: {
                    userId: getUser._id
                }
            }
            Events.SendToSocket(socket.id, userData)
        }
        console.log("getuser=========>", );
        
        let gettableQueue: any = await get(REDISKEYS.QUEUE)
        console.log('gettableQueue ', gettableQueue)
        if (gettableQueue && gettableQueue.tableIds && gettableQueue.tableIds.length > 0) {
            console.log('gettableQueue :: >>', gettableQueue.tableIds)
            let table = await get(`${REDISKEYS.TABLES}:${gettableQueue.tableIds[0]}`)
            table.playerInfo.push(getUser)
            table.activePlayer += 1;
            socket.tableId = table._id;
            await set(`${REDISKEYS.TABLES}:${gettableQueue.tableIds[0]}`, table)
            if (table.activePlayer == table.maxPlayer) {
                console.log('table.activePlayer :: ', table.activePlayer)

           
                let firstPlayer = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
                bull.addJob.delayTimer({
                    time: 5000,
                    jobId: table._id,
                    tableId: table._id,
                    currentturn: firstPlayer,
                })
                gettableQueue.tableIds.shift();
                await set(REDISKEYS.QUEUE, gettableQueue)

                let roomData: any = {
                    eventName: EVENTNAME.JOIN,
                    data: {
                        playerInfo: table.playerInfo,
                        userId: getUser._id,
                        board: table.board,
                        tableId: table._id
                    }
                }
                Events.sendToRoom(table._id, roomData)
                let roomValidateData = {
                    eventName: eventName.START,
                    data: {
                        currentturn: firstPlayer,
                        tableId: table._id,
                        roundTimer: 5
                    },
                };
                Events.sendToRoom(table._id, roomValidateData)
            } else {
                await botSignUp()
            }
        } else {
            let gameTableDefaultFormat: any = await tableFormat(getUser)
            console.log('gameTableDefaultFormat :: >>', gameTableDefaultFormat)
            gameTableDefaultFormat.activePlayer += 1;
            socket.tableId = gameTableDefaultFormat._id;
            await set(`${REDISKEYS.TABLES}:${gameTableDefaultFormat?._id}`, gameTableDefaultFormat)
            let board = await get(`${REDISKEYS.TABLES}:${gameTableDefaultFormat._id}`)
            socket.join(board._id)

            let roomData: any = {
                eventName: EVENTNAME.JOIN,
                data: {
                    playerInfo: board.playerInfo,
                    userId: getUser._id,
                    board: board.board,
                    tableId: board._id
                }
            }
            Events.sendToRoom(board._id, roomData)

            let addTableQueue = await get(REDISKEYS.QUEUE)
            if (!addTableQueue) {
                await set(REDISKEYS.QUEUE, { tableIds: [board._id] })
            } else {
                addTableQueue.tableIds.push(board._id)
                await set(REDISKEYS.QUEUE, addTableQueue)
            }
            Events.sendToRoom(board._id, roomData)
            if (board.activePlayer != board.maxPlayer) {
                await botSignUp()
            }
        }
    }
    catch (error) {
        console.log('joinGame ERROR', error)
    }
}

export { signUpGame }   
