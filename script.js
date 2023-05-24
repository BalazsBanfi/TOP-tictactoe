const gameBoard = (() => {
  const field = document.querySelectorAll(".field");
  const storedSteps = ["", "", "", "", "", "", "", "", ""];

  return { field, storedSteps };
})();

const resetBoard = () => {
  gameBoard.storedSteps = ["", "", "", "", "", "", "", "", ""];

  partialRes = [];

  console.log(`storedsteps ${gameBoard.storedSteps}`);
  console.log(`partialres ${partialRes}`);
  gameBoard.field.forEach((item) => {
    item.innerHTML = "";
  });
  console.log(`field ${gameBoard.field}`);
};

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

const errorMessage = (text) => {
  alert(text);
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
      console.log(
        `The winner is ${nextPlayer.getName()} ${nextPlayer.getSymbol()}`
      );
      resetBoard();
    } else if (!gameBoard.storedSteps.includes("") && !exist) {
      console.log(`Tie!`);
      resetBoard();
    }
  });
};

gameBoard.field.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.innerHTML !== "X" && item.innerHTML !== "O") {
      item.innerHTML = toggle(nextPlayer).getSymbol();
      gameBoard.storedSteps[item.id - 1] = item.innerHTML;
      isWinner();
    } else errorMessage("Please, choose an empty square");
  });
});
