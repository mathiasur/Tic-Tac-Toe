const Gameboard = (function () {

  const board = new Array(9).fill("-");

  const showMark = function(id, mark) {
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
    if (board[id] === "-") {
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
  let clickCounter = 0;
  const managePlayerTurns = function(element) {
    if (clickCounter % 2 != 0) {
      player1.play(Gameboard.board, element.id);
      Gameboard.showMark(element.id, player1.mark);
    } else {
      player2.play(Gameboard.board, element.id);
      Gameboard.showMark(element.id, player2.mark);
    }
  }
  document.addEventListener("click", (e) => {
    let element = e.target;
    if (element.className === "spot" && 
    element.hasChildNodes() === false) {
      clickCounter += 1;
      managePlayerTurns(element);
    }
  });
})();