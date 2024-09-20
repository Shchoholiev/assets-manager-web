import styled from "styled-components";
import cube from "/cube.svg";
import NewPasswordConfirmForm from "../components/authentication/NewPasswordConfirmForm";

const NewPasswordConfirmLayout = styled.div`
  display: flex;
  gap: 10%;
  flex-direction: column;
  align-items: start;
  justify-self: center;
  justify-content: center;
  height: 50rem;
  width: 50%;
  margin-left: 25%;

`;
const Img = styled.img`
  width: 15rem;
`
function NewPasswordConfirm() {
  return (
    <NewPasswordConfirmLayout>
      {/* <Img src={cube} alt="Cube" /> */}
      <NewPasswordConfirmForm />
    </NewPasswordConfirmLayout>
  );
}

export default NewPasswordConfirm;
