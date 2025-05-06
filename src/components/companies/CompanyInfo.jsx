import styled from "styled-components";
import { useCompany } from "./useCompany";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
`;
const CompantName = styled.p`
  font-size: 30px;
  color: var(--yellow);
  font-weight: 700;
  @media (max-width: 1024px) {
    font-size: 25px;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 425px) {
    font-size: 16px;
  }
`;

const Description = styled.p`
    text-align: justify;
    @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 425px) {
    font-size: 13px;
  }
`
function CompanyInfo() {
  const { company } = useCompany();

  return (
    <Container>
      <CompantName>{company.name.toUpperCase()}</CompantName>
      <Description>
        {company.description} 
      </Description>
    </Container>
  );
}

export default CompanyInfo;
