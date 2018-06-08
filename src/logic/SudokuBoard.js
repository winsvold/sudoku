// @flow

import {fillBoardRandomlyAlwaysFillingCellWithFewestOptions} from "./generatesudokuboard/fillBoardRandomlyAlwaysFillingCellWithFewestOptions";

export type GridCellCoordinate = {
  y: number;
  x: number;
};

export type GridCell = {
  coordinate: GridCellCoordinate;
  value: number | string;
}

function createGrid(size) {
  let sudokugrid = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let u = 0; u < size; u++) {
      row.push('');
    }
    sudokugrid.push(row);
  }
  return sudokugrid;
}

class SudokuBoard {

  values: any[][];
  size: number;

  constructor(size: number) {
    this.values = createGrid(size);
    this.size = size;
  }

  clearBoard() {
    this.values = createGrid(this.size);
  }

  generateSolution() {
    fillBoardRandomlyAlwaysFillingCellWithFewestOptions(this);
  }

  getBlueprint() {
    let bluePrint = [];
    for (let i = 1; i < this.size + 1; i++) {
      bluePrint.push(i);
    }
    return bluePrint;
  }

  setCellValue(cellCoordinate: GridCellCoordinate, newValue: number) {
    this.values[cellCoordinate.y][cellCoordinate.x] = newValue;
  }

  getGrid() {
    return this.values.slice(0);
  }

  getAllCellsWithCoordinates(): GridCell[] {
    let cellArray: GridCell[] = [];
    this.getGrid().forEach((row, rowIndex) =>
      row.forEach((cell, columnIndex) =>
        cellArray.push({
          coordinate: {x: columnIndex, y: rowIndex},
          value: cell
        })
      )
    );
    return cellArray;
  }

  getSubGridSize() {
    return Math.sqrt(this.size);
  }

  getSubGrids() {
    const subGridSize = this.getSubGridSize();
    let subGrids = [];
    for (let i = 0; i < subGridSize; i++) {
      let subGridsRow = [];
      for (let j = 0; j < subGridSize; j++) {
        subGridsRow.push(this.getSubGrid(i, j));
      }
      subGrids.push(subGridsRow);
    }
    return subGrids;
  }

  getSubGrid(row: number, column: number) {
    const subGridSize = this.getSubGridSize();
    let subGrid = [];
    for (let i = 0; i < subGridSize; i++) {
      subGrid.push(this.values[row * subGridSize + i].slice(column * subGridSize, column * subGridSize + subGridSize));
    }
    return subGrid;
  }

  getSubGridForCell(gridCell: GridCellCoordinate) {
    const subGridSize = this.getSubGridSize();
    const subGridX = Math.floor(gridCell.x / subGridSize);
    const subGridY = Math.floor(gridCell.y / subGridSize);
    return this.getSubGrid(subGridY, subGridX);
  }

  findNumbersInSubGrid(gridCell: GridCellCoordinate) {
    const subGrid = this.getSubGridForCell(gridCell);
    return subGrid.reduce((row, accumulator) => [...row, ...accumulator], []);
  }

  findMissingNumbersInSubGrid(gridCell: GridCellCoordinate) {
    const numbersInSubGrid = this.findNumbersInSubGrid(gridCell);
    return this.getBlueprint().filter((number) => !numbersInSubGrid.includes(number));
  }

  findNumbersInRow(gridCell: GridCellCoordinate) {
    const rowCoordinate = gridCell.y;
    return this.getGrid()[rowCoordinate];
  }

  findMissingNumbersInRow(gridCell: GridCellCoordinate) {
    const numbersInRow = this.findNumbersInRow(gridCell);
    return this.getBlueprint().filter((number) => !numbersInRow.includes(number));
  }

  findNumbersInColumn(gridCell: GridCellCoordinate) {
    const columnCoordinate = gridCell.x;
    return this.getGrid().map((row) => {
      return row[columnCoordinate];
    });
  }

  findMissingNumbersInColumn(gridCell: GridCellCoordinate) {
    const numbersInColumn = this.findNumbersInColumn(gridCell);
    return this.getBlueprint().filter((number) => !numbersInColumn.includes(number));
  }

  findAllPossibleNumbersForCell(gridCell: GridCellCoordinate) {
    if (this.gridCellHasNumber(gridCell)) {
      console.log('Cell all ready has a value');
      return [this.getGridCellNumber(gridCell)];
    }
    const missingNumbersInRow = this.findMissingNumbersInRow(gridCell);
    const missingNumbersInSubGrid = this.findMissingNumbersInSubGrid(gridCell);
    const missingNumbersInColumn = this.findMissingNumbersInColumn(gridCell);
    return missingNumbersInColumn.filter((number) =>
      missingNumbersInSubGrid.includes(number) && missingNumbersInRow.includes(number)
    );
  }

  gridCellHasNumber(gridCell: GridCellCoordinate) {
    return this.getGrid()[gridCell.y][gridCell.x] !== '';
  }

  getGridCellNumber(gridCell: GridCellCoordinate) {
    return this.getGrid()[gridCell.y][gridCell.x];
  }

  isValid() {
    const blueprint = this.getBlueprint();
    return !this.getGrid().some((row) =>
      row.some((cell) =>
        !blueprint.includes(cell)
      )
    );
  }
}

export default SudokuBoard;
