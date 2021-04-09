import React from 'react';
import styled, { ThemeProvider } from 'styled-components'

import HomePage from './HomePage'

var theme = {}

const StyledApp = styled.div``

function App() {
  return (
    <StyledApp>
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    </StyledApp>
  );
}

export default App;
