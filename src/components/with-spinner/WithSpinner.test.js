import { render } from '@testing-library/react'
import WithSpinner from './WithSpinner'

function TestComponent () {
    return (
        <div>Hello World!</div>
    )
}

var TestComponentWithSpinner = WithSpinner(TestComponent)

it('should show spinner if component is loading', () => {
    var { queryByText } = render(
        <TestComponentWithSpinner isLoading={true}/>
    )

    expect(queryByText('Hello World!')).toEqual(null)
})

it('should show wrapped component if it is not loading', () => {
    var { getByText } = render(
        <TestComponentWithSpinner isLoading={false}/>
    )

    expect(getByText('Hello World!')).toBeVisible()
})