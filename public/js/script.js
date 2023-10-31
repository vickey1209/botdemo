let socket = io()
document.getElementById('startbtn').addEventListener('click', () => {
  startGame()
})

let sign = 'X';
let tableId;
let playerName;
let userId;
let box = document.getElementsByClassName('box')
let storagenUserId = sessionStorage.getItem('userId')
let storagetableId = sessionStorage.getItem('tableId')


if (storagenUserId && storagetableId) {
  let rejoinData = {
    eventName: "MOVE",
    data: {
      userId: storagenUserId,
      tableId: storagetableId
    }
  }
  socket.emit("REJOIN", rejoinData)
}


function startGame() {

  do {
    playerName = prompt('enter your name:')
    socket.emit('SIGNUP', { playerName, isBot: false })
  } while (!playerName)
}
evenHandler(socket)

function signUpGame(data) {
  console.log('signUpGame data :: >>', data)
  let userId = data.userId
  sessionStorage.setItem("userId", userId)
  userId = sessionStorage.getItem("userId")
  console.log('userId :: >>', userId)

}


function joinGame(data) {
  console.log('joinGame data :: >>', data)
  document.getElementById("startbtn").disabled = true;
  sessionStorage.setItem('tableId', data.tableId)
  userId = data.userId;
  tableId = data.tableId
  console.log('join userId :: >>', userId)

  document.getElementById('userName').innerHTML = data.playerInfo[0].name
  let board = data.board
  console.log('joingame board :: >>', board)
  setBoard(board)
}

function Start(data) {
  console.log('Start data :: >>', data)
  let delaytimer = 5;
  tableId = data.data.tableId
  let roundTimerInterval = setInterval(function () {
    var counter = delaytimer--;
    let html = document.getElementById("roundTimer")
    document.getElementById("roundTimer").innerHTML = counter;
    if (counter === 0) {
      clearInterval(roundTimerInterval);
      document.getElementById("roundTimer").innerHTML = "GAME STARTED";
    }
  }, 1000);
  setTimeout(() => {
    document.getElementById("roundTimer").innerHTML = "";
  }, 8000);
}

document.querySelectorAll('.box').forEach((element) => {
  element.addEventListener('click', () => {
    console.log('box clicked', element.id);
    console.log('playerName', playerName)
    element.disabled = true;
    let data = {
      eventName: 'MOVE',
      data: {
        sign: sign,
        name: playerName,
        id: element.id,
        tableId: tableId
      }
    }
    socket.emit('MOVE_PIECES', data)
  })
})

function movePieces(data) {
  console.log('movePieces data :: >>', data.data, userId)
  let board = data.data.board
  console.log('movePieces board :: >>', board)
  setBoard(board)
}


function setBoard(data) {
  document.querySelectorAll('.box').forEach((element, index) => {

    if (data[index] === null) {
      element.innerHTML = '';
      element.disabled = false;
    } else {
      element.innerHTML = data[index]
      element.disabled = true;
    }
  })
}



function checkWinnner(data) {
  console.log('checkWinnner data :: >>', data)
  let piece = data.data
  if (piece == sign) {
    let poUp = `<div class="win-alert">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
    <strong>you win the game!!
    </div>`
    let winPopup = document.querySelector('.alertBox')
    winPopup.innerHTML = poUp
    setTimeout(() => {
      location.reload()
    }, 1000);
  } else if (piece == 'tie') {
    let poUp = `<div class="lose-alert">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
    <strong>Match Tie!!
    </div>`
    let lose = document.querySelector('.alertBox')
    lose.innerHTML = poUp
    setTimeout(() => {
      location.reload()
    }, 1500);
  } else {
    let poUp = `<div class="lose-alert">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
    <strong>you Lose the game!!
    </div>`
    let lose = document.querySelector('.alertBox')
    lose.innerHTML = poUp
    setTimeout(() => {
      location.reload()
    }, 3000);
  }
  sessionStorage.clear();
}

function userTurnStarted(data) {
  console.log('userTurnStarted data :: >>', data)
  console.log('join vvvvvv userId :: >>', userId)
  if (data.userId == userId) {
      document.getElementById('gameBoard').style.pointerEvents = "none";
  }
  else {
    document.getElementById('gameBoard').style.pointerEvents = "";
  }
}

function evenHandler(socket) {
  socket.onAny((eventName, data) => {
    console.log('evenHandler data :: >>', data)
    console.log('eventName :: >>', eventName)
    switch (eventName) {
      case 'SIGNUP':
        console.log('SIGNUP evenHandler data', data)
        signUpGame(data.data)
        break;

      case 'JOIN':
        console.log('joinGame evenHandler data', data)
        joinGame(data.data)
        break;

      case 'START':
        console.log('game started event called..');
        Start(data)
        break;

      case 'MOVE_PIECES':
        movePieces(data.data)
        break;

      case "USER_TURN_STARTED":
        userTurnStarted(data.data)
        break;

      case "WINNER":
        checkWinnner(data.data)
    }
  })
}
