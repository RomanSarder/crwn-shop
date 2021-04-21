import { render } from '@testing-library/react'
import 'jest-styled-components'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import MenuItem from './MenuItem'
import userEvent from '@testing-library/user-event'

var history = createMemoryHistory()

var testLargeItem = {
    title: 'test item', 
    imageUrl: 'test-url', 
    size: 'large', 
    linkUrl: '/test-link-url'
}

var testSmallItem = {
    ...testLargeItem,
    size: undefined
}

function renderMenuItem (size = 'small') {
    var renderResult = render(
        <Router history={history}>
            { size == 'small' ? <MenuItem {...testSmallItem} /> : <MenuItem {...testLargeItem} /> }
        </Router>
    )

    return renderResult
}

it('should properly render small menu item', () => {
    var { container, getByText } = renderMenuItem()

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText(testSmallItem.title)).toBeVisible()
    expect(getByText(/shop now/i)).toBeVisible()
})

it('should properly render large menu item', () => {
    var { container, getByText } = renderMenuItem('large')

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText(testSmallItem.title)).toBeVisible()
    expect(getByText(/shop now/i)).toBeVisible()
})

it('should properly route to collection', () => {
    var { container } = renderMenuItem()

    userEvent.click(container.firstChild)

    expect(history.location.pathname).toEqual(testSmallItem.linkUrl)
})