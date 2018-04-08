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

  constructor(){
    this.grid = createGrid(9);
    console.log(this.getQuadrants());
    console.log(this.grid);
  }

  getQuadrants() {
    let innerGrids = [];
    for(let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        let subgrid = [];
        for (let k = 0; k < 3; k++) {
          subgrid.push(this.grid[i*3 + k].slice(j*3, j*3 + 3));
        }
        row.push(subgrid);
      }
      innerGrids.push(row);
    }
    return innerGrids;
  }

}

export default Grid;
