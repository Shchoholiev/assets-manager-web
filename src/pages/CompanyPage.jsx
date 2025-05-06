import styled from "styled-components";
import CompanyInfo from "../components/companies/CompanyInfo";
import PageTitle from "../ui/PageTitle";
import { HiOutlineUserGroup } from "react-icons/hi";
import CompanyMembers from "../components/companies/CompanyMembers";
import { useCompany } from "../components/companies/useCompany";
import PageSpinnerContainer from "../styles/PageSpinnerContainer";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

function CompanyPage() {
  const { isPending } = useCompany();
  if (isPending) return <PageSpinnerContainer />;

  return (
    <Container>
      <PageTitle>
        <HiOutlineUserGroup />
        COMPANY PAGE
      </PageTitle>
      <CompanyInfo />
      <CompanyMembers />
    </Container>
  );
}

export default CompanyPage;
