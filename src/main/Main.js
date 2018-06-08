// @flow
import React, {Component} from 'react';
import SudokuBoard from "../logic/SudokuBoard";
import DrawBoard from "./DrawSudokuboard";
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const Button = styled.button`
  height: 2em;
  font-size: 1.2em;
  margin: 0.5em;
`;

const Select = styled.select`
  height: 2em;
  font-size: 1.2em;
  margin: 0.5em;
`;

type State = {
  sudokuBoard?: SudokuBoard;
  chosenSize: number;
};

class Main extends Component<{}, State> {

  constructor() {
    super();
    this.state = {
      sudokuBoard: undefined,
      chosenSize: 9
    };
  }

  componentDidMount() {
    this.generateBoard(this.state.chosenSize)
  }

  generateBoard(size: number) {
    const sudokuBoard = new SudokuBoard(size);
    sudokuBoard.generateSolution();
    this.setState({
      sudokuBoard: sudokuBoard
    })
  }

  sizeOnChange(event: SyntheticEvent<HTMLSelectElement>) {
    this.setState({
      chosenSize: parseInt(event.currentTarget.value)
    });
  }

  render() {
    const sudokuBoard = this.state.sudokuBoard ? <DrawBoard sudokuBoard={this.state.sudokuBoard}/> : '';

    return (
      <Wrapper>
        <Button onClick={() => this.generateBoard(this.state.chosenSize)}>Generate
          Board</Button>
        Size:
        <Select onChange={(event) => this.sizeOnChange(event)} value={this.state.chosenSize}>
          <option value="4">4x4</option>
          <option value="9">9x9</option>
          <option value="16">16x16</option>
        </Select>
        {sudokuBoard}
      </Wrapper>
    );
  }
}

export default Main;
