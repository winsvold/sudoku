import SudokuBoard from "./SudokuBoard";

export function fillBoardRandomly (board: SudokuBoard) {
  for (let row = 0; row < board.size; row++) {
    for (let cell = 0; cell < board.size; cell++) {
      const cellCoordinates = {x: cell, y: row};
      const possibleNumbers = board.findAllPossibleNumbersForCell(cellCoordinates);
      let newNumberIndex = Math.floor(Math.random() * (possibleNumbers.length));
      const newNumber = possibleNumbers[newNumberIndex];
      board.setCellValue(cellCoordinates, newNumber || 'N/A');
    }
  }
}