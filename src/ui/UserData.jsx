import styled from "styled-components";
import { useUser } from "../components/authentication/useUser";
import { Link } from "react-router-dom";

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
  return (
    <Container>
      {/* {user.role === "User" ? ( */}
        <StyledLink>
          CREATE OR JOIN
          <br /> COMPANY
        </StyledLink>
      {/* ) : (
        "Company Name"
      )} */}
      <Avatar>{user.name[0].toUpperCase()}</Avatar>
    </Container>
  );
}

export default UserData;
