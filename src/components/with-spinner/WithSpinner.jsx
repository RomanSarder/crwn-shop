import React from 'react'
import Spinner from '../spinner/Spinner'

export default function WithSpinner(WrappedComponent) {
    return function ComponentWithSpinner ({ isLoading, ...otherProps }) {
        return isLoading ? 
        (
            <Spinner/>
        ) :
        <WrappedComponent {...otherProps} />
    }
}
