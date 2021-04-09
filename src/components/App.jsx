import React from 'react';
import { Switch, Route } from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import HomePage from '../pages/home/HomePage'

var theme = {}

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%; // 1rem = 10px
    font-family: 'Open Sans Condensed', sans-serif;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-size: 16px; // Px fallback
    font-size: 1.6rem;
  }
`

const StyledApp = styled.div``

function App() {
  return (
    <StyledApp>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route component={HomePage} path="/" exact={true} />
        </Switch>
      </ThemeProvider>
    </StyledApp>
  );
}

export default App;
