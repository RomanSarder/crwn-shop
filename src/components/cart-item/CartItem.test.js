import { render } from '@testing-library/react'
import 'jest-styled-components'
import CartItem from './CartItem'

it('should properly render', () => {
    var testItem = { price: 10, imageUrl: 'test-url', name: 'test item', quantity: 2 }
    var { container } = render(<CartItem item={testItem}/>)

    expect(container.firstChild).toMatchSnapshot()
})