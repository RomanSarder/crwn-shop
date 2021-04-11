import React from 'react';
import { Switch, Route } from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import AuthProvider from './AuthProvider'
import HomePage from '../pages/home/HomePage'
import ShopPage from '../pages/shop/ShopPage';
import AuthPage from '../pages/auth/AuthPage'
import Page from './Page';

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

  button {
      display: inline-block;
      border: none;
      margin: 0;
      text-decoration: none;
      cursor: pointer;
      -webkit-appearance: none;
      -moz-appearance: none;
  }
`

const StyledApp = styled.div``

function App() {
  return (
    <StyledApp>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Page>
            <Switch>
              <Route component={HomePage} path="/" exact={true} />
              <Route component={ShopPage} path="/shop" />
              <Route component={AuthPage} path="/auth" />
            </Switch>
          </Page>
        </AuthProvider>
      </ThemeProvider>
    </StyledApp>
  );
}

export default App;
