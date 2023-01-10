const Gameboard = (function () {

  const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const showMark = function (id, mark) {

    const $spot = document.getElementById(id);
    const img = document.createElement("img");
    img.src = `${mark}.svg`;
    img.id = `${mark}-img`;
    $spot.appendChild(img);

  }

  return {
    board,
    showMark,
  }

})();

const Player = (mark) => {

  const play = function (board, id) {
    if (typeof board[id] === "number") {
      return board[id] = mark;
    }
  };

  return {
    mark,
    play
  };

};

const displayController = (function () {

  const player1 = Player("x");
  const player2 = Player("o");
  const board = Gameboard.board;

  const managePlayerTurns = function (element, clickCounter) {

    if (clickCounter % 2 != 0) {
      player1.play(board, element.id);
      Gameboard.showMark(element.id, player1.mark);
    } else {
      player2.play(board, element.id);
      Gameboard.showMark(element.id, player2.mark);
    }

  }

  const checkWin = function () {
    // check horizontal lines 
    for (let spot = 0; spot <= 6; spot += 3) {
      if (board[spot] === board[spot + 1] &&
        board[spot] === board[spot + 2]) {
        return true;
      }
    }
    // check vertical lines
    for (let spot = 0; spot <= 2; spot++) {
      if (board[spot] === board[spot + 3] &&
        board[spot] === board[spot + 6]) {
        return true;
      }
    }
    // check diagonals
    if (board[0] === board[4] &&
      board[0] === board[8]) {
      return true;
    }
    if (board[2] === board[4] &&
      board[2] === board[6]) {
      return true;
    }
  }

  return {
    managePlayerTurns,
    checkWin,
  }

})();

let clickCounter = 0;

document.addEventListener("click", (e) => {

  let element = e.target;

  if (element.className === "spot" &&
    element.hasChildNodes() === false) {

    clickCounter += 1;
    displayController.managePlayerTurns(element, clickCounter);
    console.log(displayController.checkWin());
  
  }

});
