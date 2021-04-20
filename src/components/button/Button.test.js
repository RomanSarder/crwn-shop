import '@testing-library/jest-dom'
import 'jest-styled-components'
import { render } from '@testing-library/react'

import Button from './Button'

it('should properly render', () => {
    var { container } = render(
    <Button>
        Test1
    </Button>)

    expect(container.firstChild).toMatchSnapshot()
})

it('should properly render google button', () => {
    var { container } = render(
        <Button appearance="google">
            Test1
        </Button>)
    
        expect(container.firstChild).toMatchSnapshot()
})

it('should properly render inverse button', () => {
    var { container } = render(
    <Button appearance="inverse">
        Test1
    </Button>)

    expect(container.firstChild).toMatchSnapshot()
})