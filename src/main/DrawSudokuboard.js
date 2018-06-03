// @flow
import * as React from 'react';
import styled from 'styled-components';
import SudokuBoard from "../logic/SudokuBoard";

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
  font-size: ${props => 35 / props.size}vmin;
  background-color: white;
  height: ${props => 75 / props.size}vmin;
  width: ${props => 75 / props.size}vmin;
`;

type Props = {
  sudokuBoard: SudokuBoard;
};

function DrawBoard(props: Props) {

  const subGridSize = props.sudokuBoard.getSubGridSize();
  const grid = props.sudokuBoard
    .getSubGrids().map((subGridRow, subGridRowIndex) => subGridRow.map((subGrid, subGridIndex) =>
      <SubGrid subGridSize={subGridSize} key={`row${subGridRowIndex}column${subGridIndex}`}>
        {
          subGrid.map((row, rowIndex) => row.map((element, elementIndex) =>
            <GridItem key={`row${rowIndex}column${elementIndex}`} size={props.sudokuBoard.size}>
              {element}
            </GridItem>))
        }
      </SubGrid>
    ));
  return (
    <GridDiv subGridSize={subGridSize}>
      {grid}
    </GridDiv>
  );
}

export default DrawBoard;
