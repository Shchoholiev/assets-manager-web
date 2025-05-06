import styled from "styled-components";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import { useState } from "react";
import { useAddCompanyMember } from "./useAddCompanyMember";
import Spinner from "../../ui/Spinner";
const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.4fr 0.2fr;
  grid-gap: 1rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 0.6fr 0.3fr;
  }
  @media (max-width: 425px) {
    grid-template-columns: 1fr 0.4fr;
    grid-gap: 0.5rem;
  }
`;
const StyledInput = styled(Input)`
  background-color: var(--gray-500);
  color: var(--gray-100);
  font-size: 16px;
  &::placeholder {
    color: var(--gray-200);
  }
  &[disabled] {
    background-color: var(--gray-600);
    color: var(--gray-500);
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0.4rem 0.6rem;
  }
  @media (max-width: 320px) {
    font-size: 12px;
  }
`;

function AddUser() {
  const [newMember, setNewMember] = useState("");
  const { addMember, isPending } = useAddCompanyMember();
  const handleInviteUser = () => {
    console.log(newMember);
    addMember({ email: newMember });
  };
  return (
    <Container>
      <StyledInput
        type="text"
        placeholder="Email"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        disabled={isPending}
      />
      <Button variation="primary" onClick={handleInviteUser}>
        {isPending ? <Spinner /> : "INVITE"}
      </Button>
    </Container>
  );
}

export default AddUser;
