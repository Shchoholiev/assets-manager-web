import styled from "styled-components";
import PageTitle from "../ui/PageTitle";
import { HiOutlineUsers } from "react-icons/hi";
import CreateCompanyForm from "../components/companies/CreateCompanyForm";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

function CreateCompanyPage() {
  return (
    <Container>
      <PageTitle>
        <HiOutlineUsers />
        CREATE COMPANY
      </PageTitle>
      <CreateCompanyForm />
    </Container>
  );
}

export default CreateCompanyPage;
