import React from 'react'
import { render } from '@testing-library/react'
import { CartContent } from './CartContent'
import userEvent from '@testing-library/user-event';

jest.mock('../CartItem', () => () => (<div>Hello World</div>))

const testCartItems = [
    {
        id: 1,
        imageUrl: 'test1',
        name: 'Test Item 1',
        price: 10,
        quantity: 1
    },
    {
        id: 2,
        imageUrl: 'test2',
        name: 'Test Item 2',
        price: 20,
        quantity: 2
    }
]

it('should render proper cart content with mocked cart items', () => {
    var onCheckoutMock = jest.fn()
    const mockTotalValue = 5

    var { container } = render(<CartContent items={testCartItems} onCheckout={onCheckoutMock} total={mockTotalValue}/>)

    expect(container.firstChild).toMatchSnapshot()
})

it('should have checkout button working', () => {
    var onCheckoutMock = jest.fn()
    const mockTotalValue = 5

    var { getByText } = render(<CartContent items={testCartItems} onCheckout={onCheckoutMock} total={mockTotalValue}/>)

    var button = getByText('Go To Checkout')

    userEvent.click(button)

    expect(onCheckoutMock).toHaveBeenCalledTimes(1)
})

it('should render proper number of cart items', () => {
    var onCheckoutMock = jest.fn()
    const mockTotalValue = 5

    var { getAllByText } = render(<CartContent items={testCartItems} onCheckout={onCheckoutMock} total={mockTotalValue}/>)

    expect(getAllByText('Hello World').length).toEqual(2)
})

it('should properly render cart items', () => {
    var onCheckoutMock = jest.fn()
    var renderCartItemsMock = jest.fn()
    const mockTotalValue = 5

    render(<CartContent items={testCartItems} onCheckout={onCheckoutMock} total={mockTotalValue} renderCartItems={renderCartItemsMock}/>)

    expect(renderCartItemsMock).toHaveBeenCalledWith(testCartItems)
})