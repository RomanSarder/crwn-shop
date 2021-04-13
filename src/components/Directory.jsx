import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectDirectoryItems } from '../store/directory/selectors'

import MenuItem from './MenuItem'

const StyledDirectoryMenu = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    &>*:last-of-type {
        grid-column: 1 / 3
    }

    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) { 
        grid-template-columns: repeat(4, 1fr);

        &>*:nth-child(1n) {
            grid-column: 1 / 3
        }

        &>*:nth-child(2n) {
            grid-column: 3 / 5
        }

        &>*:last-of-type {
            grid-column: 2 / 4
        }
    }

    // Extra large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) { 
        grid-template-columns: repeat(6, 1fr);

        & > *:nth-child(1) {
            grid-column: 1 / 3
        }
        & > *:nth-child(2) {
            grid-column: 3 / 5
        }
        & > *:nth-child(3) {
            grid-column: 5 / 7
        }
        & > *:nth-child(4) {
            grid-column: 1 / 4
        }
        & > *:nth-child(5) {
            grid-column: 4 / 7
        }
     }
`

export default function Directory() {
    var sections = useSelector(selectDirectoryItems)

    return (
        <StyledDirectoryMenu>
            {sections.map(function renderMenuItems({ title, imageUrl, linkUrl, id, size }) {
                return ( <MenuItem 
                        size={size}
                        title={title} 
                        imageUrl={imageUrl} 
                        linkUrl={linkUrl} 
                        key={id} /> )
            })}
        </StyledDirectoryMenu>
    )
}
