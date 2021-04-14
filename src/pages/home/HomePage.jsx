import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Directory from '../../components/Directory'
import { getCollectionsData } from '../../store/collections/actions'


export default function HomePage() {
    var dispatch = useDispatch()
    console.log(getCollectionsData())
    useEffect(function loadCollectionsData () {
        dispatch(getCollectionsData())
    })

    return (
        <div>
            <Directory />
        </div>
    )
}
