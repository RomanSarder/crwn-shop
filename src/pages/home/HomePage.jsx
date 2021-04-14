import React from 'react'

import WithDirectoryLoading from '../../components/WithDirectoryLoading'
import Directory from '../../components/Directory'


export function HomePage() {

    return (
        <div>
            <Directory />
        </div>
    )
}

export default WithDirectoryLoading(HomePage)
