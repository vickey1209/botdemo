import { REDISKEYS } from "../constants";
import { del, get, set } from "../redisOperations";

const cleargame = async (socket: any) => {
    try {
        let boardId = socket.tableId;
        if (boardId) {
            let queue = await get(REDISKEYS.QUEUE);
            console.log('cleargame queue :: >>', queue)
            console.log('queue && queue.tableIds.length', queue, queue.tableIds)
            if (queue && queue.tableIds.length > 0) {
                queue.tableIds.includes(boardId) ? queue.tableIds.splice(queue.tableIds.indexOf(boardId), 1) : null;
                let tableId = JSON.stringify(queue.tableIds)
                console.log('tableId', tableId)
                await set(REDISKEYS.QUEUE, tableId)
            }
            let table = await get(`${REDISKEYS.TABLES}:${boardId}`)
            console.log('json table', table)
            // console.log('table :: >>', table.data.player[0], table.data.player[1])
            console.log('table && table.playerInfo[0]', table && table.playerInfo[0])
            if (table && table.playerInfo[0]) {
                await del(`${REDISKEYS.PLAYERS}:${table.playerInfo[0]._id}`)
                await del(`${REDISKEYS.PLAYERS}:${table.playerInfo[1]._id}`)
                await del(`${REDISKEYS.TABLES}:${table._id}`)
            }
            
        }
    }
    catch (error) {
        console.log('cleargame ERROR :: >>', error);
    }
}
export { cleargame }
