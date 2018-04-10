// @flow
import React, {Component} from 'react';
import styled from 'styled-components';
import Grid from './logic/Grid';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(papayawhip, darkgoldenrod);
`;

const GridDiv = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4px;
  padding: 4px;
  background-color: black;
  box-shadow: 1vmin 1.5vmin 4vmin rgba(0, 0, 0, 0.5);
  > *:nth-child(2n){
    > *{
      background-color: lightgray;
    }
  }
`;

const SubGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2px;
  background-color: gray;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2vw;
  background-color: white;
  height: 6vmin;
  width: 6vmin;
`;

class App extends Component {

  constructor() {
    super();
    this.state = {grid: new Grid(9)};
  }

  render() {
    const grid = this.state.grid
      .getSubGrids().map((subGridRow, subGridRowIndex) => subGridRow.map((subGrid, subGridIndex) =>
        <SubGrid>
          {
            subGrid.map((row, rowIndex) => row.map((element, elementIndex) =>
              <GridItem>
                {/*subGridRowIndex*27 + subGridIndex*3 + rowIndex*9 + elementIndex + 1*/}
                {subGridRowIndex * 3 + rowIndex},{subGridIndex * 3 + elementIndex}
              </GridItem>))
          }
        </SubGrid>
      ));
    console.log(grid);
    return (
      <Wrapper>
        <GridDiv>
          {grid}
        </GridDiv>
      </Wrapper>
    );
  }
}

export default App;
