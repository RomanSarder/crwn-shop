import { act, render, waitFor } from '@testing-library/react'
import 'jest-styled-components'
import SignUp from './SignUp'
import { AuthContext } from '../auth-provider/AuthProvider'
import userEvent from '@testing-library/user-event'

var signUpMock = jest.fn()
var makeSignUpMock = jest.fn()

var providerValueMock = {
    makeSignUpFunction: makeSignUpMock
}

function renderSignUp () {
    var renderResult = render(
        <AuthContext.Provider value={providerValueMock}>
            <SignUp />
        </AuthContext.Provider>
    )

    return renderResult
}

it('<SignUp /> should properly render form', () => {
    var { container, getByLabelText, getByRole, getAllByRole, getByText } = renderSignUp()

    expect(container.firstChild).toMatchSnapshot()

    expect(getByRole('heading')).toHaveTextContent('Register new account')
    expect(getByText((content, element) => {
        return element.tagName.toLowerCase() === 'span' && /^sign up$/i.test(content)
    })).toBeVisible()

    var textboxes = getAllByRole('textbox')

    expect(textboxes[0]).toHaveAttribute('name', 'displayName')
    expect(textboxes[1]).toHaveAttribute('name', 'email')
    expect(getByLabelText('Password')).toBeVisible()
    expect(getByLabelText('Password')).toHaveAttribute('type', 'password')
    expect(getByLabelText('Confirm Password')).toBeVisible()
    expect(getByLabelText('Confirm Password')).toHaveAttribute('type', 'password')

    expect(getByRole('button')).toHaveTextContent(/^sign up$/i)
})

it('<SignUp /> should properly submit form', () => {
    makeSignUpMock.mockImplementation(() => signUpMock)
    const testName = 'Test Display Name'
    const testEmail = 'email@test.com'
    const testPassword = 'pass'
    var { getByRole , getByLabelText, getAllByRole} = renderSignUp()

    act(() => {
        var textboxes = getAllByRole('textbox')

        userEvent.type(textboxes[0], testName)
        userEvent.type(textboxes[1], testEmail)
        userEvent.type(getByLabelText('Password'), testPassword)
        userEvent.type(getByLabelText('Confirm Password'), testPassword)
        userEvent.click(getByRole('button'))
    })

    waitFor(() => {
        expect(makeSignUpMock).toHaveBeenCalledTimes(1)
        expect(makeSignUpMock).toHaveBeenLastCalledWith({ displayName: testName })
        expect(signUpMock).toHaveBeenCalledTimes(1)
        expect(signUpMock).toHaveBeenLastCalledWith(testEmail, testPassword)
    })
})

it('<SignUp /> not sign up if password doesnt match', () => {
    makeSignUpMock.mockImplementation(() => signUpMock)
    const testName = 'Test Display Name'
    const testEmail = 'email@test.com'
    const testPassword = 'pass'
    var { getByRole , getByLabelText, getAllByRole} = renderSignUp()

    act(() => {
        var textboxes = getAllByRole('textbox')

        userEvent.type(textboxes[0], testName)
        userEvent.type(textboxes[1], testEmail)
        userEvent.type(getByLabelText('Password'), testPassword)
        userEvent.type(getByLabelText('Confirm Password'), 'wrong confirm password')
        userEvent.click(getByRole('button'))
    })

    waitFor(() => {
        expect(makeSignUpMock).toHaveBeenCalledTimes(1)
        expect(makeSignUpMock).toHaveBeenLastCalledWith({ displayName: testName })
        expect(signUpMock).not.toHaveBeenCalled()
    })
})