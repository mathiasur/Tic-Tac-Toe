const Gameboard = (function () {

  const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const showMark = function (id, mark) {

    const $spot = document.getElementById(id);
    const img = document.createElement("img");
    img.src = `${mark}.svg`;
    img.id = `${mark}-img`;
    $spot.appendChild(img);

  }

  const increaseMarkSize = function (id) {

    const $spot = document.getElementById(id);
    const $img = $spot.lastChild;
    setTimeout(() => {
      $img.classList.add("win");
    }, 250);

  }

  const resetBoard = function () {
    const $spots = document.querySelectorAll(".spot");
    $spots.forEach((spot, i) => {
      if (spot.hasChildNodes()) {
        spot.removeChild(spot.lastChild);
      }
      board[i] = i;
    });
  }

  const displayCover = function (display) {
    const $cover = document.querySelector(".cover");
    if (display === true) {
      $cover.classList.add("displayCover");
    } else {
      $cover.classList.remove("displayCover");
    }
  }

  return {
    board,
    showMark,
    increaseMarkSize,
    resetBoard,
    displayCover,
  }

})();

// player factory
const Player = (mark) => {

  const play = function (arr, id) {
    if (typeof arr[id] === "number") {
      return arr[id] = mark;
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

  const toggleMenu = function () {
    const $gameMode = document.querySelector("#game-mode").value;
    const $difficulty = document.querySelector("#difficulty");
    if ($gameMode === "vs-player") {
      $difficulty.style = "display: none";
    } else {
      $difficulty.style = "display: flex";
    }
  };

  const managePlayerTurns = function (element, clickCounter) {
    const $gameMode = document.querySelector("#game-mode").value;
    // odd clicks = player1 turn
    if (clickCounter % 2 != 0) {
      player1.play(board, element.id);
      Gameboard.showMark(element.id, player1.mark);
    } else {
      if ($gameMode === "vs-player") {
        player2.play(board, element.id);
        Gameboard.showMark(element.id, player2.mark);
      }
    }

  }

  const _win = function () {
    // check horizontal lines 
    for (let spot = 0; spot <= 6; spot += 3) {
      if (board[spot] === board[spot + 1] &&
        board[spot] === board[spot + 2]) {
        return [spot, (spot + 1), (spot + 2)];
      }
    }
    // check vertical lines
    for (let spot = 0; spot <= 2; spot++) {
      if (board[spot] === board[spot + 3] &&
        board[spot] === board[spot + 6]) {
        return [spot, (spot + 3), (spot + 6)];
      }
    }
    // check diagonals
    if (board[0] === board[4] &&
      board[0] === board[8]) {
      return [0, 4, 8];
    }
    if (board[2] === board[4] &&
      board[2] === board[6]) {
      return [2, 4, 6];
    }

    return false;
  }

  const checkWin = function () {
    if (_win()) {
      Gameboard.displayCover(true);
      const row = _win();
      row.map(spot => {
        Gameboard.increaseMarkSize(spot);
      });
    }
  }

  return {
    toggleMenu,
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
    displayController.checkWin();

  }

  if (element.id === "game-mode") {
    Gameboard.displayCover(false);
    displayController.toggleMenu();
    Gameboard.resetBoard();
    clickCounter = 0;
  }

});
