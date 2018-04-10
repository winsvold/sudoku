// @flow

function createGrid(size){
  let sudokugrid = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let u = 0; u < size; u++) {
      row.push(i*9 + u + 1);
    }
    sudokugrid.push(row);
  }
  return sudokugrid;
}

class Grid {
  constructor(size){
    this.value = createGrid(size);
    this.size = size;
    console.log(this.getSubGrids());
  }
  getGrid(){
    return this.value.slice(0);
  }
  getSubGridSize(){
    return Math.sqrt(this.size);
  }
  getSubGrids() {
    const subGridSize = this.getSubGridSize();
    let subGrids = [];
    for(let i = 0; i < subGridSize; i++) {
      let subGridsRow = [];
      for (let j = 0; j < subGridSize; j++) {
        let subGrid = [];
        for (let k = 0; k < subGridSize; k++) {
          subGrid.push(this.value[i*subGridSize + k].slice(j*subGridSize, j*subGridSize + subGridSize));
        }
        subGridsRow.push(subGrid);
      }
      subGrids.push(subGridsRow);
    }
    return subGrids;
  }

  findNumbersInSubGrid(gridCell){
    // TODO
  }
  findMissingNumbersInSubGrid(gridCell){
    // TODO
  }

  findNumbersInRow(gridCell){
    // TODO
  }
  findMissingNumbersInRow(gridCell){
    // TODO
  }

  findNumbersInColumn(gridCell){
    // TODO
  }
  findMissingNumbersInColumn(gridCell){
    // TODO
  }

  findAllPossibleNumbersForEmptyCell(gridCell){
    // TODO
  }
}

export default Grid;
