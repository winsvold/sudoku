import {fillCellRandomly, fillSubGridRandomly} from "./fillSudokuBoardUtils";
import SudokuBoard from "../SudokuBoard";

export function fillBoardRandomlyAlwaysFillingCellWithFewestOptions(board: SudokuBoard) {
  let iterationCount = 0;
  do {
    iterationCount++;
    console.log(iterationCount);
    board.clearBoard();
    fillSubGridRandomly(board, 1, 1);
    let error = false;
    while (!error && !board.isValid()) {
      error = !fillOneOfTheCellsWithFewestOptions(board);
    }
    if (!board.isValid()) {
      console.log('Failed to generate board');
    } else {
      console.log('Successfully generated board');
    }
  } while (!board.isValid())
}

function fillOneOfTheCellsWithFewestOptions(board: SudokuBoard) {
  const cell = findOneOfTheCellsWithFewestOptions(board);
  return fillCellRandomly(board, cell.coordinate);
}

function cellIsNotFilled(cell) {
  return !Number.isInteger(cell.value);
}

function getCellsAndPossibleNumbers(board) {
  return board.getAllCellsWithCoordinates()
    .filter(cellIsNotFilled)
    .map(cell => {
        return {
          ...cell,
          possibleNumbers: board.findAllPossibleNumbersForCell(cell.coordinate)
        }
      }
    );
}

function getLowestPossibleNumbersLength(cellsAndPossibleNumbers, board) {
  return cellsAndPossibleNumbers.reduce((lowest, currentValue) =>
      currentValue.possibleNumbers.length < lowest ? currentValue.possibleNumbers.length : lowest
    , board.size);
}

function findCellsWithFewestOptions(board) {
  const cellsAndPossibleNumbers = getCellsAndPossibleNumbers(board);
  const lowestPossibleNumbersLength = getLowestPossibleNumbersLength(cellsAndPossibleNumbers, board);
  return cellsAndPossibleNumbers
    .filter(cell => cell.possibleNumbers.length === lowestPossibleNumbersLength);
}

function findOneOfTheCellsWithFewestOptions(board: SudokuBoard){
  const cellsWithLowestPossibleNumbers = findCellsWithFewestOptions(board);
  const currentCellIndex = Math.floor(Math.random()*cellsWithLowestPossibleNumbers.length);
  return cellsWithLowestPossibleNumbers[currentCellIndex];
}
