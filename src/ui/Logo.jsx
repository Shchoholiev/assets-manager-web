import styled from "styled-components";
import logo from "/logo.svg";
const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4%;
`;
const P = styled.p`
  color: var(--teal);
  font-weight: bolder;
  @media (max-width: 425px) {
    font-size: 15px;
  }
  @media (max-width: 320px) {
    font-size: 13px;
  }
`;
const Img = styled.img`
  width: 55px;
  @media (max-width: 425px) {
    width: 45px;
  }
  @media (max-width: 320px) {
    width: 35px;
  }
`;
function Logo() {
  return (
    <StyledLogo>
      <Img src={logo} alt="Logo" />
      <P>SNIP&KEEP</P>
    </StyledLogo>
  );
}

export default Logo;
