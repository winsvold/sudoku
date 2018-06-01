// @flow
import React, {Component} from 'react';
import styled from 'styled-components';
import SudokuBoard from './logic/SudokuBoard';
import {fillBoardRandomly, fillBoardRandomlyTheIdaWay, fillColumnRandomly} from './logic/FillSudokuBoard';

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
    this.state = {sudokuBoard: new SudokuBoard(9)};
  }

  componentDidMount() {
    const sudokuBoard = this.state.sudokuBoard;
    fillBoardRandomlyTheIdaWay(sudokuBoard);
    this.setState({});
  }

  render() {
    const subGridSize = this.state.sudokuBoard.getSubGridSize();
    const grid = this.state.sudokuBoard
      .getSubGrids().map((subGridRow, subGridRowIndex) => subGridRow.map((subGrid, subGridIndex) =>
        <SubGrid subGridSize={subGridSize}>
          {
            subGrid.map((row, rowIndex) => row.map((element, elementIndex) =>
              <GridItem>
                {element}
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
