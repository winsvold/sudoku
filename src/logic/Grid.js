// @flow

type GridCellCoordinate = {
  y: number;
  x: number;
};

function createGrid(size) {
  let sudokugrid = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let u = 0; u < size; u++) {
      row.push(i * 9 + u + 1);
    }
    sudokugrid.push(row);
  }
  return sudokugrid;
}

class Grid {
  constructor(size) {
    this.value = createGrid(size);
    this.size = size;
  }

  getGrid() {
    return this.value.slice(0);
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
        let subGrid = [];
        for (let k = 0; k < subGridSize; k++) {
          subGrid.push(this.value[i * subGridSize + k].slice(j * subGridSize, j * subGridSize + subGridSize));
        }
        subGridsRow.push(subGrid);
      }
      subGrids.push(subGridsRow);
    }
    return subGrids;
  }

  findSubGrid(gridCell: GridCellCoordinate){
    const subGridSize = this.getSubGridSize();
    const subGridX = Math.floor(gridCell.x / subGridSize);
    const subGridY = Math.floor(gridCell.y / subGridSize);
    return {x: subGridX, y: subGridY};
  };

  findNumbersInSubGrid(gridCell: GridCellCoordinate) {
    const subGirdCoordinate = this.findSubGrid(gridCell);
    const subgrid = this.getSubGrids()[subGirdCoordinate.y][subGirdCoordinate.x];
    return subgrid.reduce((row, accumulator)=> [...row, ...accumulator], [] );
  }

  findMissingNumbersInSubGrid(gridCell: GridCellCoordinate) {
    // TODO
  }

  findNumbersInRow(gridCell: GridCellCoordinate) {
    const rowCoordinate = gridCell.y;
    return this.getGrid()[rowCoordinate];
  }

  findMissingNumbersInRow(gridCell) {
    // TODO
  }

  findNumbersInColumn(gridCell: GridCellCoordinate) {
    const columnCoordinate = gridCell.x;
    return this.getGrid().map((row) => {
      return row[columnCoordinate];
    });
  }

  findMissingNumbersInColumn(gridCell) {
    // TODO
  }

  findAllPossibleNumbersForEmptyCell(gridCell) {
    // TODO
  }
}

export default Grid;
