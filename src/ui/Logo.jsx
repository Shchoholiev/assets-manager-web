import styled from "styled-components";
import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";
const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;
const P = styled.p`
  color: var(--teal);
  font-weight: bolder;
  cursor: pointer;
  @media (max-width: 1024px) {
    visibility: hidden;
  }
  /* @media (max-width: 425px) {
    font-size: 14px;
  }
  @media (max-width: 320px) {
    font-size: 13px;
  } */
`;
const Img = styled.img`
  width: 55px;
  @media (max-width: 425px) {
    width: 40px;
  }
  @media (max-width: 320px) {
    width: 35px;
  }
`;
function Logo() {
  const navigate = useNavigate()
  return (
    <StyledLogo>
      <Img src={logo} alt="Logo" />
      <P onClick={()=> navigate("/assets")}>SNIP&KEEP</P>
    </StyledLogo>
  );
}

export default Logo;
