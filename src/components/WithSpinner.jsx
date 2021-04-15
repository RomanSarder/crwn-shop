import React from 'react'
import Spinner from './Spinner'

export default function WithSpinner(WrappedComponent) {
    return function ComponentWithSpinner ({ isLoading, ...otherProps }) {
        return isLoading ? 
        (
            <Spinner/>
        ) :
        <WrappedComponent {...otherProps} />
    }
}
