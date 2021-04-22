import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import AuthProvider from './auth-provider/AuthProvider'
import Page from './page/Page';
import Spinner from './spinner/Spinner';

var GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%; // 1rem = 10px
    
    * {
      font-family: 'Open Sans Condensed', sans-serif;
    }
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

var StyledApp = styled.div``

var HomePage = lazy(() => import('../pages/home/HomePage'))
var ShopPage = lazy(() => import('../pages/shop/ShopPage'))
var AuthPage = lazy(() => import('../pages/auth/AuthPage'))
var CheckoutPage = lazy(() => import('../pages/checkout/CheckoutPage'))

function App() {

  return (
    <StyledApp>
      <GlobalStyle />
        <AuthProvider>
          <Page>
            <Switch>
              <Suspense fallback={Spinner}>
                <Route exact component={HomePage} path="/" />
                <Route component={ShopPage} path="/shop" />
                <Route exact component={AuthPage} path="/auth" />
                <Route exact component={CheckoutPage} path="/checkout" />
              </Suspense>
            </Switch>
          </Page>
        </AuthProvider>
    </StyledApp>
  );
}

export default App;
