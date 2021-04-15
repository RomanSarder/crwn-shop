import styled from 'styled-components'

const StyledAuthForm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    .title {
        font-size: 2.8rem;
        margin: 1rem 0;
    }

    span {
        font-size: 2rem;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    @media (min-width: 576px) {
        width: 38rem;
    }
`

export default StyledAuthForm