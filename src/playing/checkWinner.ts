import eventName from '../constants/eventName';
import EVENTS from '../handleEmmiter';
import { cleargame } from './cleargame';

export const checkWinner = async (data: any, socket: any) => {
    try {
        console.log('checkWinner data :: >>', data)
        let table: any = data.board;
        let match = ["XXX", "OOO"];
        let winner = [
            table[0] + table[1] + table[2],
            table[3] + table[4] + table[5],
            table[6] + table[7] + table[8],
            table[0] + table[3] + table[6],
            table[1] + table[4] + table[7],
            table[2] + table[5] + table[8],
            table[0] + table[4] + table[8],
            table[2] + table[4] + table[6],
        ];
        let isTie = true;
        let winTable=false
        for (let i = 0; i < winner.length; i++) {
            console.log('check win for loop :: >>', winner[i] === match[1], "winner[i] === match[0]", winner[i] === match[0])
            console.log('print pieces :: >>', winner, winner[i], match[1], "winner[i], match[0]", winner[i], match[0])
            if (winner[i] === match[0]) {
                console.log('second winner :: >>', winner[i] === match[1], "winner[i] === match[0]", winner[i] === match[0])
                isTie = false
                // return true
                let winData = {
                    eventName: eventName.WINNER,
                    data: {
                        data: "X"
                    }
                }
                winTable= true;
                EVENTS.sendToRoom(data._id, winData)
                await cleargame(socket)

            } else if (winner[i] === match[1]) {
                isTie = false
                let winData = {
                    eventName: eventName.WINNER,
                    data: {
                        data: "O"
                    }
                }
                winTable= true;
                EVENTS.sendToRoom(data._id, winData)
                await cleargame(socket)
            }
        }
        for (let index = 0; index < table.length; index++) {
            const element = table[index];
            console.log('element RRR', element)
            if (element == null) {
                isTie = false
            }

        }
        console.log('isTie', isTie)
        if (isTie) {
            console.log("isTie is true")
            let tieData = {
                eventName: eventName.WINNER,
                data: {
                    data: 'tie'
                }
            }
            winTable= true;
            isTie=false;
            EVENTS.sendToRoom(data._id, tieData)
            await cleargame(socket)
        }
        return winTable;
    } catch (error) {
        console.log('checkWinner ERROR :: >>', error);
    }
}
