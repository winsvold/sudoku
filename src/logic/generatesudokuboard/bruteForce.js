import SudokuBoard from "../SudokuBoard";
import {fillColumnRandomly, fillRowRandomly} from "./fillSudokuBoardUtils";

export function fillBoardRandomly(board: SudokuBoard) {
  let iteration = 0;
  while (!board.isValid()) {
    iteration++;
    board.clearBoard();
    for (let row = 0; row < board.size; row++) {
      fillRowRandomly(board, row);
    }
  }
  if (!board.isValid()) {
    alert('Failed to fill board in 2000 iterations');
  }
  console.log('It took', iteration, 'iterations to fill the board');
}

export function fillBoardRandomlyTheIdaWay(board: SudokuBoard) {
  let iteration = 0;
  while (!board.isValid() && iteration < 2000) {
    iteration++;
    board.clearBoard();
    for (let index = 0; index < board.size; index++) {
      fillRowRandomly(board, index);
      fillColumnRandomly(board, index);
    }
  }
  if (!board.isValid()) {
    alert('Failed to fill board in 2000 iterations');
  }
  console.log('It took', iteration, 'iterations to fill the board');
}
