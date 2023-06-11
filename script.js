const gameBoard = (() => {
  const field = document.querySelectorAll(".field");
  const storedSteps = ["", "", "", "", "", "", "", "", ""];
  
  return { field, storedSteps };
})();

const resetBoard = () => {  
  gameBoard.storedSteps = ["", "", "", "", "", "", "", "", ""];

  partialRes = [];

  gameBoard.field.forEach((item) => {
    item.innerHTML = "";
  });
};

const reset = document.querySelector("#reset");
reset.addEventListener('click', resetBoard);

const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

const PlayerX = Player("jeff", "X");
const PlayerO = Player("bally", "O");

let nextPlayer = PlayerX;

const toggle = (next) => {
  nextPlayer = next == PlayerO ? PlayerX : PlayerO;
  return nextPlayer;
};

const message = document.querySelector('.errorMessage');

const errorMessage = (text) => {
  message.innerHTML = text;
};

const isWinner = () => {
  let winner = false;
  const winningStates = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  let partialRes = gameBoard.storedSteps.reduce((acc, currValue, index) => {
    if (currValue === nextPlayer.getSymbol()) {
      acc.push(index + 1);
    }
    return acc;
  }, []);

  winningStates.some((array) => {
    const exist = array.every((value) => {
      return partialRes.includes(value);
    });
    if (exist) {
      errorMessage(
        `The winner is ${nextPlayer.getName()}, with symbol: ${nextPlayer.getSymbol()}`
      );
    } else if (!gameBoard.storedSteps.includes("") && !exist) {
      errorMessage(`Tie!`);
    }
  });
};

gameBoard.field.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.innerHTML !== "X" && item.innerHTML !== "O") {
      errorMessage("&nbsp");
      item.innerHTML = toggle(nextPlayer).getSymbol();
      gameBoard.storedSteps[item.id - 1] = item.innerHTML;
      isWinner();
    } else errorMessage("Please, choose an empty square");
  });
});