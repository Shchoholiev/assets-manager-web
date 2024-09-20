import styled from "styled-components";
import SignupLogo from "../components/authentication/SignupLogo";
import SignupForm from "../components/authentication/SignupForm";

const SignupLayout = styled.main`
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
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 1fr;
    gap: unset;
  }
`;
function Signup() {
  return (
    <SignupLayout>
      <SignupLogo />
      <SignupForm />
    </SignupLayout>
  );
}

export default Signup;
