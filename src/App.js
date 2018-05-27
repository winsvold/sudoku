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
    this.state = {grid: new Grid(9)};
  }

  componentDidMount() {
    const grid = this.state.grid;
    console.log(grid.findNumbersInSubGrid({x: 2, y: 4}));
    console.log(grid.findNumbersInRow({x: 0, y: 8}));
    console.log(grid.findNumbersInColumn({x: 2, y: 5}));
  }

  render() {
    const subGridSize = this.state.grid.getSubGridSize();
    const grid = this.state.grid
      .getSubGrids().map((subGridRow, subGridRowIndex) => subGridRow.map((subGrid, subGridIndex) =>
        <SubGrid subGridSize={subGridSize}>
          {
            subGrid.map((row, rowIndex) => row.map((element, elementIndex) =>
              <GridItem>
                {subGridRowIndex*27 + subGridIndex*3 + rowIndex*9 + elementIndex + 1}
              </GridItem>))
          }
        </SubGrid>
      ));
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
