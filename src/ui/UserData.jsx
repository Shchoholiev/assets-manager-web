import styled from "styled-components";
import { useUser } from "../components/authentication/useUser";
import { Link } from "react-router-dom";
import { useCompany } from "../components/companies/useCompany";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  text-align: end;
  color: var(--teal);
  font-weight: bolder;
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
    width: 45px;
    height: 45px;
    font-size: 15px;
  }
  @media (max-width: 320px) {
    width: 35px;
    height: 35px;
    font-size: 13px;
  }
`;
const StyledLink = styled(Link)`
  align-self: center;
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
  return (
    <Container>
      {!company || isPending ? (
        <StyledLink>
          CREATE OR JOIN
          <br /> COMPANY
        </StyledLink>
      ) : (
        <StyledLink>{company.name.toUpperCase()}</StyledLink>
      )}

      <Avatar>{user.name[0].toUpperCase()}</Avatar>
    </Container>
  );
}

export default UserData;
