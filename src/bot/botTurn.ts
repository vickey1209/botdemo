import { movePieces } from "../playing/movePieces";

export const botTurn = async (turndata: any): Promise<void> => {
    try {
        console.log('botTurn data :: >>', turndata.currentTurnSI)
        let isBot = turndata.playerInfo[turndata.currentTurnSI].isBot
        console.log('isBot :: >>', isBot)
        let board = turndata.board

        let empltyindex: number[] = []

        if (isBot) {
            board.forEach((element: any, index: any) => {
                if (element == null) {
                    empltyindex.push(index)
                }
            })
            console.log('empltyindex :: >>', empltyindex)

            let botSign = turndata.playerInfo[turndata.currentTurnSI].sign;
            console.log('botSign :: >>', botSign)
            let oppoSign = "";
            if (botSign === "X")
                oppoSign = "O";
            else
                oppoSign = "X";
            let ranNumber = empltyindex[Math.floor(Math.random() * empltyindex.length - 1) + 1];
            if (board[0] == botSign && board[1] == botSign && board[2] == null) {
                console.log('condition 1 called', board)
                ranNumber = 2;
            } else if (board[0] == botSign && board[2] == botSign && board[1] == null) {
                ranNumber = 1;
                console.log('condition 2 called', board)
            } else if (board[1] == botSign && board[2] == botSign && board[0] == null) {
                ranNumber = 0;
                console.log('condition 3 called', board)
            } else if (board[3] == botSign && board[4] == botSign && board[5] == null) {
                ranNumber = 5;
                console.log('condition 4 called', board)
            } else if (board[3] == botSign && board[5] == botSign && board[4] == null) {
                ranNumber = 4;
                console.log('condition 5 called', board)
            } else if (board[4] == botSign && board[5] == botSign && board[3] == null) {
                ranNumber = 3;
                console.log('condition 6 called', board)
            } else if (board[6] == botSign && board[7] == botSign && board[8] == null) {
                ranNumber = 8;
                console.log('condition 7 called', board)
            } else if (board[6] == botSign && board[8] == botSign && board[7] == null) {
                ranNumber = 7;
                console.log('condition 8 called', board)
            } else if (board[7] == botSign && board[8] == botSign && board[6] == null) {
                ranNumber = 6;
                console.log('condition 9 called', board)
            } else if (board[0] == botSign && board[3] == botSign && board[6] == null) {
                ranNumber = 6;
                console.log('condition 10 called', board)
            } else if (board[0] == botSign && board[6] == botSign && board[3] == null) {
                ranNumber = 3;
                console.log('condition 11 called', board)
            } else if (board[3] == botSign && board[6] == botSign && board[0] == null) {
                ranNumber = 0;
                console.log('condition 12 called', board)
            } else if (board[1] == botSign && board[4] == botSign && board[7] == null) {
                ranNumber = 7;
                console.log('condition 13 called', board)
            } else if (board[1] == botSign && board[7] == botSign && board[4] == null) {
                ranNumber = 4;
                console.log('condition 14 called', board)
            } else if (board[4] == botSign && board[7] == botSign && board[1] == null) {
                ranNumber = 1;
                console.log('condition 15 called', board)
            } else if (board[2] == botSign && board[5] == botSign && board[8] == null) {
                ranNumber = 8;
                console.log('condition 16 called', board)
            } else if (board[2] == botSign && board[8] == botSign && board[5] == null) {
                ranNumber = 5;
                console.log('condition 17 called', board)
            } else if (board[5] == botSign && board[8] == botSign && board[2] == null) {
                ranNumber = 2;
                console.log('condition 18 called', board)
            } else if (board[0] == botSign && board[4] == botSign && board[8] == null) {
                ranNumber = 8;
                console.log('condition 19 called', board)
            } else if (board[0] == botSign && board[8] == botSign && board[4] == null) {
                ranNumber = 4;
                console.log('condition 20 called', board)
            } else if (board[4] == botSign && board[8] == botSign && board[0] == null) {
                ranNumber = 0;
                console.log('condition 21 called', board)
            } else if (board[2] == botSign && board[4] == botSign && board[6] == null) {
                ranNumber = 6;
                console.log('condition 22 called', board)
            } else if (board[2] == botSign && board[6] == botSign && board[4] == null) {
                ranNumber = 4;
                console.log('condition 23 called', board)
            } else if (board[4] == botSign && board[6] == botSign && board[2] == null) {
                ranNumber = 2;
                console.log('condition 24 called', board)
            } else if ((board[0] == oppoSign || board[2] == oppoSign || board[6] == oppoSign || board[8] == oppoSign) && board[4] == null) {
                ranNumber = 4;
                console.log('condition 48 called', board)
            } else if (board[0] == oppoSign && board[1] == oppoSign && board[2] == null) {
                ranNumber = 2;
                console.log('condition 25 called', board)
            } else if (board[0] == oppoSign && board[2] == oppoSign && board[1] == null) {
                ranNumber = 1;
                console.log('condition 26 called', board)
            } else if (board[1] == oppoSign && board[2] == oppoSign && board[0] == null) {
                ranNumber = 0;
                console.log('condition 27 called', board)
            } else if (board[3] == oppoSign && board[4] == oppoSign && board[5] == null) {
                ranNumber = 5;
                console.log('condition 28 called', board)
            } else if (board[3] == oppoSign && board[5] == oppoSign && board[4] == null) {
                ranNumber = 4;
                console.log('condition 29 called', board)
            } else if (board[4] == oppoSign && board[5] == oppoSign && board[3] == null) {
                ranNumber = 3;
                console.log('condition 30 called', board)
            } else if (board[6] == oppoSign && board[7] == oppoSign && board[8] == null) {
                ranNumber = 8;
                console.log('condition 31 called', board)
            } else if (board[6] == oppoSign && board[8] == oppoSign && board[7] == null) {
                ranNumber = 7;
                console.log('condition 32 called', board)
            } else if (board[7] == oppoSign && board[8] == oppoSign && board[6] == null) {
                ranNumber = 6;
                console.log('condition 33 called', board)
            } else if (board[0] == oppoSign && board[3] == oppoSign && board[6] == null) {
                ranNumber = 6;
                console.log('condition 34 called', board)
            } else if (board[0] == oppoSign && board[6] == oppoSign && board[3] == null) {
                ranNumber = 3;
                console.log('condition 35 called', board)
            } else if (board[3] == oppoSign && board[6] == oppoSign && board[0] == null) {
                ranNumber = 0;
                console.log('condition 36 called', board)
            } else if (board[1] == oppoSign && board[4] == oppoSign && board[7] == null) {
                ranNumber = 7;
                console.log('condition 37 called', board)
            } else if (board[1] == oppoSign && board[7] == oppoSign && board[4] == null) {
                ranNumber = 4;
                console.log('condition 38 called', board)
            } else if (board[4] == oppoSign && board[7] == oppoSign && board[1] == null) {
                ranNumber = 1;
                console.log('condition 39 called', board)
            } else if (board[2] == oppoSign && board[5] == oppoSign && board[8] == null) {
                ranNumber = 8;
                console.log('condition 40 called', board)
            } else if (board[2] == oppoSign && board[8] == oppoSign && board[5] == null) {
                ranNumber = 5;
                console.log('condition 41 called', board)
            } else if (board[0] == oppoSign && board[4] == oppoSign && board[8] == null) {
                ranNumber = 8;
                console.log('condition 42 called', board)
            } else if (board[0] == oppoSign && board[8] == oppoSign && board[4] == null) {
                ranNumber = 4;
                console.log('condition 43 called', board)
            } else if (board[4] == oppoSign && board[8] == oppoSign && board[0] == null) {
                ranNumber = 0;
                console.log('condition 44 called', board)
            } else if (board[2] == oppoSign && board[4] == oppoSign && board[6] == null) {
                ranNumber = 6;
                console.log('condition 45 called', board)
            } else if (board[2] == oppoSign && board[6] == oppoSign && board[4] == null) {
                ranNumber = 4;
                console.log('condition 46 called', board)
            } else if (board[4] == oppoSign && board[6] == oppoSign && board[2] == null) {
                ranNumber = 2;
                console.log('condition 47 called', board)
            } else if ((board[1] == oppoSign || board[3] == oppoSign || board[5] == oppoSign || board[7] == oppoSign)&&board[1] != botSign&& board[3] != botSign&& board[5] != botSign&& board[7] != botSign) {
                console.log("condition new :: >> ");
                if (board[1] == null)
                    ranNumber = 1;
                else if (board[3] == null)
                    ranNumber = 3;
                else if (board[5] == null)
                    ranNumber = 5;
                else if (board[7] == null)
                    ranNumber = 7;
            } else if (board[4] == oppoSign) {
                console.log('condition 49 called', board)
                if (board[0] == null)
                    ranNumber = 0;
                else if (board[2] == null)
                    ranNumber = 2;
                else if (board[6] == null)
                    ranNumber = 6;
                else if (board[8] == null)
                    ranNumber = 8;
            }
            console.log("ranodom number:: >>", ranNumber);

            console.log('player name :: >>', turndata.playerInfo[turndata.currentTurnSI].playerName)
            let moveData = {
                eventName: 'MOVE',
                data: {
                    sign: 'O',
                    name: turndata.playerInfo[turndata.currentTurnSI].playerName,
                    id: 'A' + ranNumber,
                    tableId: turndata._id
                }
            }
            movePieces(moveData, { id: "bot", userId: turndata.playerInfo[turndata.currentTurnSI]._id, tableId: turndata._id })
        }
    } catch (error) {
        console.log('botTurn ERROR :: >>', error);

    }
}
