import React, { useState } from 'react'
import styled from 'styled-components'

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

var defaultSectionsValue = [
    {
      title: 'hats',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
      id: 1,
      linkUrl: 'shop/hats'
    },
    {
      title: 'jackets',
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
      id: 2,
      linkUrl: 'shop/jackets'
    },
    {
      title: 'sneakers',
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
      id: 3,
      linkUrl: 'shop/sneakers'
    },
    {
      title: 'womens',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
      size: 'large',
      id: 4,
      linkUrl: 'shop/womens'
    },
    {
      title: 'mens',
      imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
      size: 'large',
      id: 5,
      linkUrl: 'shop/mens'
    }
];

export default function Directory() {
    const [sections] = useState(defaultSectionsValue)

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
