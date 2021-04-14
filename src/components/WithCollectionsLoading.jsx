import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCollectionsData } from '../store/collections/actions'
import { selectCollectionsIsLoading } from '../store/collections/selectors'
import WithSpinner from './WithSpinner'

export default function WithCollectionsLoading(WrappedComponent) {
    return function ComponentWithCollectionsLoading (props) {
        const isLoading = useSelector(selectCollectionsIsLoading)
        var dispatch = useDispatch()

        useEffect(function loadCollectionsData () {
            dispatch(getCollectionsData())
        })

        return WithSpinner(WrappedComponent)({ isLoading, ...props })
    }
}
