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
  getSubGrids() {
    const subGridSize = Math.sqrt(this.size);
    let innerGrids = [];
    for(let i = 0; i < subGridSize; i++) {
      let row = [];
      for (let j = 0; j < subGridSize; j++) {
        let subgrid = [];
        for (let k = 0; k < subGridSize; k++) {
          subgrid.push(this.value[i*subGridSize + k].slice(j*subGridSize, j*subGridSize + subGridSize));
        }
        row.push(subgrid);
      }
      innerGrids.push(row);
    }
    return innerGrids;
  }
}

export default Grid;
