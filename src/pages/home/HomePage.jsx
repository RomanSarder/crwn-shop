import React from 'react'

import WithDirectoryLoading from '../../components/with-directory-loading/WithDirectoryLoading'
import Directory from '../../components/directory/Directory'


export function HomePage() {

    return (
        <div>
            <Directory />
        </div>
    )
}

export default WithDirectoryLoading(HomePage)
