import styled from "styled-components";
import cone from "/cone.svg";
import ResetForm from "../components/authentication/ResetForm";

const PasswordResetLayout = styled.div`
  min-height: 70vh;
  margin: 0 auto;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Cone = styled.img`
    margin-top: 7rem;

  @media (max-width: 1024px) {
    margin-top: 10rem;
    width: 16rem;
  }
  @media (max-width: 768px) {
    width: 14rem;
  }
  @media (max-width: 425px) {
    width: 12.5rem;
  }
`;

function PasswordReset() {
  return (
    <PasswordResetLayout>
      <Cone src={cone} alt="Cone" />
      <ResetForm />
    </PasswordResetLayout>
  );
}

export default PasswordReset;
