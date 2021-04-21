import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import 'jest-styled-components'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { addItemToCart } from '../../store/cart/actions'
import CollectionItemContainer, { CollectionItem } from './CollectionItem'

var testItem = {
    id: 1,
    price: 10,
    name: 'test item 1',
    imageUrl: 'test image url 1'
}

function renderCollectionItemComponent ({ onAddToCart = jest.fn() } = {}) {
    var renderResult = render(<CollectionItem {...testItem} onAddToCart={onAddToCart}/>)

    return renderResult
}

function renderCollectionItemContainer (store) {
    var renderResult = render(
        <Provider store={store}>
            <CollectionItemContainer {...testItem} />
        </Provider>
    )

    return renderResult
}

it('<CollectionItem /> should properly render', () => {
    var { container, getByText, getByRole } = renderCollectionItemComponent()

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText(testItem.name)).toBeVisible()
    expect(getByText(`$${testItem.price}`)).toBeVisible()
    expect(getByRole('button', { hidden: true })).toHaveTextContent('Add To Cart')
})

it('<CollectionItem /> should properly call handle when Add To Cart clicked', () => {
    var onAddToCartMock = jest.fn()
    var { getByRole } = renderCollectionItemComponent({ onAddToCart: onAddToCartMock })

    userEvent.click(getByRole('button', { hidden: true }))

    expect(onAddToCartMock).toHaveBeenCalledTimes(1)
})

it('should properly dispatch addToCart action on button click', () => {
    var store = configureStore()()
    var { getByRole } = renderCollectionItemContainer(store)

    userEvent.click(getByRole('button', { hidden: true }))

    expect(store.getActions()[0]).toEqual({
        type: addItemToCart().type,
        payload: testItem
    })
})