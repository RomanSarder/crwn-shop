import { render } from '@testing-library/react'
import 'jest-styled-components'
import userEvent from '@testing-library/user-event'
import Collection, { handleCategoryClick } from './Collection'

jest.mock('../collection-item/CollectionItem', () => () => (<div>Hello World</div>))

const testTitle = 'Test collection title'
var testCollectionItems = [
    {
        id: 1,
        name: 'test item 1',
        imageUrl: 'test image 1',
        price: 10,
    },
    {
        id: 2,
        name: 'test item 2',
        imageUrl: 'test image 2',
        price: 20
    }
]

it('<Collection /> should properly render with children', () => {
    var { container, getByRole, getAllByText } = render(<Collection items={testCollectionItems} title={testTitle} />)

    expect(container.firstChild).toMatchSnapshot()
    expect(getByRole('heading')).toBeVisible()
    expect(getByRole('heading')).toHaveTextContent(testTitle)
    expect(getAllByText('Hello World').length).toEqual(2)
})

it('<Collection /> should properly trigger handle when title is clicked', () => {
    var handleCategoryClickMock = jest.fn()
    var onCategoryClickMock = () => handleCategoryClickMock
    var { getByRole } = render(<Collection items={testCollectionItems} title={testTitle} onCategoryClick={onCategoryClickMock}/>)

    userEvent.click(getByRole('heading'))

    expect(handleCategoryClickMock).toHaveBeenCalledTimes(1)
})

it('<Collection /> should route to proper category url', () => {
    var historyMock = {
        push: jest.fn()
    }

    handleCategoryClick(historyMock, testTitle)()

    expect(historyMock.push).toHaveBeenCalledWith(`/shop/${testTitle}`)
})