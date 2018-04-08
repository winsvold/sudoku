// @flow
import React, {Component} from 'react';
import styled from 'styled-components';
import Grid from './logic/Grid';

const GridDiv = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  margin: auto;
  height: 60vw;
  width: 60vw;
  margin-top: 10%;
  justify-content: center;
  padding: 5px;
  box-shadow: 0 2px 10px black;
  > * {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 3vw;
    background-color: lightblue;
    box-shadow: inset 0 1px 3px black;
  }
`;

class App extends Component {

  constructor(){
    super();
    this.state = {grid: new Grid};
  }

  render() {
    const grid = this.state.grid.grid.map(column => column.map(element => <div>{element}</div>));
    return (
      <GridDiv>
        {grid}
      </GridDiv>
    );
  }
}

export default App;
