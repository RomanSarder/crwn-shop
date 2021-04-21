import { withCreateUserProfileDocument, withFirebaseAuthInstance } from './utils'

it('withCreateUserProfileDocument should call wrapped function before creating user profile with additional data', async () => {
    var testUser = {
        displayName: 'test'
    }
    var testAdditionalData = {
        test: true
    }
    var testWrappedFnArgument = 'test-arg'
    var mockFn = jest.fn(async () => ({ user: testUser}))

    await withCreateUserProfileDocument(mockFn, mockFn)(testAdditionalData)(testWrappedFnArgument)

    expect(mockFn).toHaveBeenNthCalledWith(1, testWrappedFnArgument)
    expect(mockFn).toHaveBeenNthCalledWith(2, testUser, { test: true })
})

it('withFirebaseAuthInstance should call wrapped function with auth instance', async () => {
    var testAuthInstance = { test: true }
    var testArg = 'test-arg'
    var mockFn = jest.fn(async () => testAuthInstance)
    var wrappedFunctionMock = jest.fn()
    var mockMakeWrappedFunction = jest.fn(() => wrappedFunctionMock)
    await withFirebaseAuthInstance(mockMakeWrappedFunction, mockFn)(testArg)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockMakeWrappedFunction).toHaveBeenCalledWith(testAuthInstance)
    expect(wrappedFunctionMock).toHaveBeenCalledWith(testArg)
})