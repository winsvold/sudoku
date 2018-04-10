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
  grid-template-columns: ${props => '1fr '.repeat(props.subGridSize)};
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
  grid-template-columns: ${props => '1fr '.repeat(props.subGridSize)};
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
  height: 5vmin;
  width: 5vmin;
`;

class App extends Component {

  constructor() {
    super();
    this.state = {grid: new Grid(16)};
  }

  render() {
    const subGridSize = this.state.grid.getSubGridSize();
    const grid = this.state.grid
      .getSubGrids().map((subGridRow, subGridRowIndex) => subGridRow.map((subGrid, subGridIndex) =>
        <SubGrid subGridSize={subGridSize}>
          {
            subGrid.map((row, rowIndex) => row.map((element, elementIndex) =>
              <GridItem>
                {/*subGridRowIndex*27 + subGridIndex*3 + rowIndex*9 + elementIndex + 1*/}
                {subGridRowIndex * subGridSize + rowIndex},{subGridIndex * subGridSize + elementIndex}
              </GridItem>))
          }
        </SubGrid>
      ));
    console.log(grid);
    return (
      <Wrapper>
        <GridDiv subGridSize={subGridSize}>
          {grid}
        </GridDiv>
      </Wrapper>
    );
  }
}

export default App;
