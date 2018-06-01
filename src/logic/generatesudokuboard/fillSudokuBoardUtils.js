import SudokuBoard from "../SudokuBoard";
import type {GridCellCoordinate} from "../SudokuBoard";

export function fillCellRandomly(board: SudokuBoard, cell: GridCellCoordinate) {
  const gridCellNumber = board.getGridCellNumber(cell);
  if(Number.isInteger(gridCellNumber)) {
    console.log('cell all ready has a value', gridCellNumber, cell, board);
    return false;
  }
  const possibleNumbers = board.findAllPossibleNumbersForCell(cell);
  const newNumberIndex = Math.floor(Math.random() * (possibleNumbers.length));
  const newNumber = possibleNumbers[newNumberIndex];
  board.setCellValue(cell, newNumber || 'N/A');
  if(!newNumber) {
    return false;
  }
  return true;
}

export function fillRowRandomly(board: SudokuBoard, row) {
  for (let column = 0; column < board.size; column++) {
    const cellCoordinates = {x: column, y: row};
    fillCellRandomly(board, cellCoordinates);
  }
}

export function fillColumnRandomly(board: SudokuBoard, column) {
  for (let row = 0; row < board.size; row++) {
    const cellCoordinates = {x: column, y: row};
    fillCellRandomly(board, cellCoordinates);
  }
}

export function fillSubGridRandomly(board: SudokuBoard, subGridRow: number, subGridColumn: number) {
  const subGridSize = board.getSubGridSize();
  for (let row = subGridSize * subGridRow; row < subGridSize * (subGridRow + 1); row++) {
    for (let column = subGridSize * subGridColumn; column < subGridSize * (subGridColumn + 1); column++) {
      const cellCoordinates = {x: column, y: row};
      fillCellRandomly(board, cellCoordinates);
    }
  }
}
