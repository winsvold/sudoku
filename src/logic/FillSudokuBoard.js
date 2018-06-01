import SudokuBoard from "./SudokuBoard";

export function fillRowRandomly(board: SudokuBoard, row) {
  for (let cell = 0; cell < board.size; cell++) {
    const cellCoordinates = {x: cell, y: row};
    const possibleNumbers = board.findAllPossibleNumbersForCell(cellCoordinates);
    let newNumberIndex = Math.floor(Math.random() * (possibleNumbers.length));
    const newNumber = possibleNumbers[newNumberIndex];
    board.setCellValue(cellCoordinates, newNumber || 'N/A');
  }
}

export function fillColumnRandomly(board: SudokuBoard, column) {
  for (let row = 0; row < board.size; row++) {
    const cellCoordinates = {x: column, y: row};
    const possibleNumbers = board.findAllPossibleNumbersForCell(cellCoordinates);
    let newNumberIndex = Math.floor(Math.random() * (possibleNumbers.length));
    const newNumber = possibleNumbers[newNumberIndex];
    board.setCellValue(cellCoordinates, newNumber || 'N/A');
  }
}

export function fillBoardRandomly(board: SudokuBoard) {
  let iteration = 0;
  while (!board.isValid()) {
    iteration++;
    board.clearBoard();
    for (let row = 0; row < board.size; row++) {
      fillRowRandomly(board, row);
    }
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
  if(!board.isValid()){
    alert('Failed to fill board in 2000 iterations');
  }
  console.log('It took', iteration, 'iterations to fill the board');
}
