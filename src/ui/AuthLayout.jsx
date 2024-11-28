import styled from "styled-components";

const AuthLayout = styled.main`
  min-height: 90vh;
  width: 90vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;

  @media (max-width: 1024px) {
    width: 100vw;
    grid-gap: 5%;
  }
  @media (max-width: 768px) {
    margin-top: 7%;
    min-height: 50vh;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 1fr;
    gap: unset;
  }
  @media (max-width: 425px) {
    min-height: 65vh;
  }
`;

export default AuthLayout;
