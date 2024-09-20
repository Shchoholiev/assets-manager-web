import styled from "styled-components";
import cone from "/cone.svg";
import ResetForm from "../components/authentication/ResetForm";

const PasswordResetLayout = styled.div`
  min-height: 70vh;
  margin-top: 7rem;
  display: grid;
  justify-items: center;
  align-items: center;
`;

function PasswordReset() {
  return (
    <PasswordResetLayout>
      <img src={cone} alt="Cone" />
      <ResetForm />
    </PasswordResetLayout>
  );
}

export default PasswordReset;
