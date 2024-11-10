import styled from "styled-components";
import NewPasswordConfirmForm from "../components/authentication/NewPasswordConfirmForm";

const NewPasswordConfirmLayout = styled.div`
  display: flex;
  gap: 10%;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  min-height: 50vh;
  width: 60vw;
  margin-left: 35%;
  @media (max-width: 1024px) {
    margin: 0 auto;
    width: 50vw;
  }
`;

function NewPasswordConfirm() {
  return (
    <NewPasswordConfirmLayout>
      <NewPasswordConfirmForm />
    </NewPasswordConfirmLayout>
  );
}

export default NewPasswordConfirm;
