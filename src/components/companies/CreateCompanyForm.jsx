import styled from "styled-components";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import { useState } from "react";
import { createCompany } from "../../services/apiCompanies";
import { useCreateCompany } from "./useCreateCompany";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";

const StyledForm = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (max-width: 1024px) {
    width: 75vw;
  }
  @media (max-width: 425px) {
    width: 95vw;
  }
`;

const StyledInput = styled(Input)`
  background-color: var(--gray-500);
  color: var(--gray-100);
  font-size: 16px;
  margin-bottom: 1rem;
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
  }
`;
const P = styled.p`
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const Description = styled.textarea`
  background-color: var(--gray-500);
  border: none;
  border-radius: var(--border-radius-m);
  padding: 1rem 1.2rem;
  font-size: 16px;
  color: var(--gray-100);
  resize: none;
  min-height: 7rem;
  margin-bottom: 3rem;

  &::placeholder {
    color: var(--gray-200);
  }
  &[disabled] {
    background-color: var(--gray-600);
    color: var(--gray-500);
    cursor: not-allowed;
  }
  @media (max-width: 1024px) {
    padding: 0.8rem 1rem;
    font-size: 14px;
  }
  @media (max-width: 768px) {
    min-height: 10rem;
  }
`;
const Note = styled.p`
    font-size: 13px;
    font-style: italic;
    color: var(--pink);
`
function CreateCompanyForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { createCompany, isPending } = useCreateCompany();

  const handleCreate = () => {
    if (!name || !description) {
      toast.error("Fill in all the fields!");
      return;
    }
    createCompany({
      name,
      description,
    });
  };
  return (
    <StyledForm>
      <P>Name: </P>
      <StyledInput
        type="text"
        placeholder="Provide a company name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isPending}
      />
      <P>Description: </P>
      <Description
        type="text"
        placeholder="Start writing description for your company..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isPending}
      />
      <Button variation="primary" disabled={isPending} onClick={handleCreate}>
        {isPending ? <Spinner /> : "CREATE"}
      </Button>
      <Note>*Reauthorization is required after creating a company.</Note>
    </StyledForm>
  );
}

export default CreateCompanyForm;
