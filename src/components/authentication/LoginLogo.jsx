import styled from "styled-components";
import cube from "/cube.svg";
import ring from "/ring.svg";
import { Link, useNavigate } from "react-router-dom";

const LoginLogoLayout = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.7fr;
  grid-gap: 5%;
`;

const LogoLayers = styled.div`
  display: flex;
  flex-direction: column;
`;

const H1 = styled.h1`
  font-size: 4rem;
`;
const H2 = styled.h2`
  font-size: 2.5rem;
  color: var(--teal);
`;
const P = styled.p`
  color: var(--gray-200);
`;
const Cube = styled.img`
  align-self: center;
`;
const StyledLink = styled(Link)`
  color: var(--yellow);
  cursor: pointer;
  &:hover {
    text-shadow: 0px 0px 15px;
    transition: text-shadow 300ms ease;
  }
`;
function LoginLogo() {
  const navigate = useNavigate();
  return (
    <LoginLogoLayout>
      <Cube src={cube} alt="cube" />
      <LogoLayers>
        <img src={ring} alt="ring" />
        <H1>Log in to</H1>
        <H2>SNIP&KEEP</H2>
        <P>
          If you do not have an account
          <br /> You can
          <StyledLink to="/signup"> Register here!</StyledLink>
        </P>
      </LogoLayers>
    </LoginLogoLayout>
  );
}

export default LoginLogo;
