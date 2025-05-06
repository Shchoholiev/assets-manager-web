import styled from "styled-components";
import { useUser } from "../components/authentication/useUser";
import { Link } from "react-router-dom";
import { useCompany } from "../components/companies/useCompany";
import Spinner from "./Spinner";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  text-align: end;
  color: var(--teal);
  font-weight: bolder;
  align-items: center;
  @media (max-width: 425px) {
    gap: 0.5rem;
  }
`;
const Avatar = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: var(--teal);
  font-weight: bolder;
  background-color: var(--yellow);
  @media (max-width: 425px) {
    width: 40px;
    height: 40px;
    font-size: 14px;
  }
  @media (max-width: 320px) {
    width: 35px;
    height: 35px;
    font-size: 13px;
  }
`;
const StyledLink = styled(Link)`
  text-align: end;
  &:hover {
    color: var(--yellow);
    transition: ease-in-out 300ms;
  }

  @media (max-width: 425px) {
    font-size: 15px;
  }
  @media (max-width: 320px) {
    font-size: 12px;
  }
`;
function UserData() {
  const { user } = useUser();
  const { company, isPending } = useCompany();
  if (isPending)
    return (
      <Container>
        <Spinner />

        <Avatar>{user.name[0].toUpperCase()}</Avatar>
      </Container>
    );
  return (
    <Container>
      {!company ? (
        <StyledLink to={"/create-company"}>
          CREATE OR JOIN
          <br /> COMPANY
        </StyledLink>
      ) : (
        <StyledLink to={`/company/${company.name}`}>
          {company.name.toUpperCase()}
        </StyledLink>
      )}

      <Avatar>{user.name[0].toUpperCase()}</Avatar>
    </Container>
  );
}

export default UserData;
