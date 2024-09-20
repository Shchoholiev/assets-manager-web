import styled from "styled-components";
import logo from "/logo.svg";
const StyledLogo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4%;
`
const P = styled.p`
    color: var(--teal);
    font-weight: bolder;
`
const Img = styled.img`
    width: 55px;
`
function Logo() {
    return (
        <StyledLogo>
            <Img src={logo} alt="Logo"/>
            <P>SNIP&KEEP</P>
        </StyledLogo>
    )
}

export default Logo
