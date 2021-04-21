import { act, render, waitFor } from '@testing-library/react'
import 'jest-styled-components'
import SignIn from './SignIn'
import { AuthContext } from '../auth-provider/AuthProvider'
import userEvent from '@testing-library/user-event'

var providerValueMock = {
    signInWithGoogle: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
}

function renderSignIn () {
    var renderResult = render(
        <AuthContext.Provider value={providerValueMock}>
            <SignIn />
        </AuthContext.Provider>
    )

    return renderResult
}

it('<SignIn /> should properly render form', () => {
    var { container, getByLabelText, getByRole, getAllByRole, getByText } = renderSignIn()

    expect(container.firstChild).toMatchSnapshot()

    expect(getByRole('heading')).toHaveTextContent('I already have an account')
    expect(getByText((content, element) => {
        return element.tagName.toLowerCase() === 'span' && /^sign in$/i.test(content)
    })).toBeVisible()
    expect(getByRole('textbox')).toHaveAttribute('name', 'email')
    expect(getByLabelText('password', { exact: false })).toBeVisible()
    expect(getByLabelText('password', { exact: false })).toHaveAttribute('type', 'password')

    var buttons = getAllByRole('button')
    expect(buttons.length).toEqual(2)

    expect(buttons[0]).toHaveTextContent(/^sign in$/i)
    expect(buttons[1]).toHaveTextContent(/sign in with google/i)
})

it('<SignIn /> should properly submit form', () => {
    var { getByText } = renderSignIn()

    act(() => {
        var button = getByText((content, element) => {
            return element.tagName.toLowerCase() === 'button' && /^sign in$/i.test(content)
        })
        userEvent.click(button)
    })

    waitFor(() => {
        expect(providerValueMock.signInWithEmailAndPassword).toHaveBeenCalledTimes(1)
    })
})

it('<SignIn /> should properly sign in with google', () => {
    var { getByText } = renderSignIn()

    act(() => {
        var button = getByText((content, element) => {
            return element.tagName.toLowerCase() === 'button' && /^sign in with google$/i.test(content)
        })
        userEvent.click(button)
    })

    waitFor(() => {
        expect(providerValueMock.signInWithGoogle).toHaveBeenCalledTimes(1)
    })
})