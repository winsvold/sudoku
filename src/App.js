// @flow
import React, {Component} from 'react';
import Main from "./main/Main";
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(papayawhip, darkgoldenrod);
`;

class App extends Component<{}> {

  render() {
    return <Wrapper><Main/></Wrapper>;
  }
}

export default App;
