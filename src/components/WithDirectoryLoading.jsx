import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDirectoryData } from '../store/directory/actions'
import { selectDirectoryIsLoading } from '../store/directory/selectors'
import WithSpinner from './WithSpinner'

export default function WithDirectoryLoading(WrappedComponent) {
    return function ComponentWithCollectionsLoading (props) {
        const isLoading = useSelector(selectDirectoryIsLoading)
        var dispatch = useDispatch()

        useEffect(function loadDirectoryData () {
            dispatch(getDirectoryData())
        }, [])

        return WithSpinner(WrappedComponent)({ isLoading, ...props })
    }
}
