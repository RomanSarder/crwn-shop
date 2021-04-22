import { render, screen } from '@testing-library/react'
import 'jest-styled-components'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import configureStore from 'redux-mock-store'

import AuthPage from './AuthPage'
import e from 'express'

jest.mock('../../components/sign-in/SignIn', () => () => (<div>Sign In</div>))
jest.mock('../../components/sign-up/SignUp', () => () => (<div>Sign Up</div>))

var history = createMemoryHistory()

function renderAuthPage (store) {
    var renderResult = render(
        <Router history={history}>
            <Switch>
                <Route path="/auth" exact component={() => (
                    <Provider store={store}>
                        <AuthPage/>
                    </Provider>
                )}/>
            </Switch>
        </Router>
    )

    return renderResult
}

it('<AuthPage /> should stay if no user profile is set', () => {
    history.push('/auth')
    var store = configureStore()({
        user: {
            currentUser: null
        }
    })
    var { getByText } = renderAuthPage(store)

    expect(getByText('Sign In')).toBeVisible()
    expect(getByText('Sign Up')).toBeVisible()
    expect(history.location.pathname).toEqual('/auth')
})

it('<AuthPage /> redirect if user profile is set', () => {
    history.push('/auth')
    var store = configureStore()({
        user: {
            currentUser: { test: true }
        }
    })
    renderAuthPage(store)
    expect(history.location.pathname).toEqual('/')
})