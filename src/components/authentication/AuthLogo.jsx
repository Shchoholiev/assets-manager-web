import styled from "styled-components";
import cube from "/cube.svg";
import ring from "/ring.svg";
import { Link } from "react-router-dom";

const AuthLogoLayout = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.7fr;
  grid-gap: 5%;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
  }
`;

const LogoLayers = styled.div`
  display: flex;
  flex-direction: column;
`;

const H1 = styled.h1`
  font-size: 4rem;
  @media (max-width: 1024px) {
    font-size: 3.2rem;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;
const H2 = styled.h2`
  font-size: 2.5rem;
  color: var(--teal);
  @media (max-width: 1024px) {
    font-size: 2.2rem;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;
const P = styled.p`
  color: var(--gray-200);
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 425px) {
    font-size: 0.9rem;
  }
`;
const Cube = styled.img`
  align-self: center;
  @media (max-width: 1024px) {
    width: 8rem;
  }
  @media (max-width: 768px) {
    width: 7rem;
  }
`;
const Ring = styled.img`
  @media (max-width: 1024px) {
    width: 18rem;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const StyledLink = styled(Link)`
  color: var(--yellow);
  cursor: pointer;
  &:hover {
    text-shadow: 0px 0px 15px;
    transition: text-shadow 300ms ease;
  }
`;
function AuthLogo({type}) {
  const signup = type === "signup";
  const login = type === "login";

  return (
    <AuthLogoLayout>
      <Cube src={cube} alt="cube" />
      <LogoLayers>
        <Ring src={ring} alt="ring" />
        {signup && <H1>Sign up to</H1>}
        {login && <H1>Log in to</H1>}
        <H2>SNIP&KEEP</H2>
        {login && (
          <P>
            If you do not have an account
            <br /> You can
            <StyledLink to="/signup"> Register here!</StyledLink>
          </P>
        )}
        {signup && (
          <P>
            If you already have an account
            <br /> You can
            <StyledLink to="/login"> Log in here!</StyledLink>
          </P>
        )}
      </LogoLayers>
    </AuthLogoLayout>
  );
}

export default AuthLogo;
