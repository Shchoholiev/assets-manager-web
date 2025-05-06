import styled from "styled-components";
import TeamTable from "../../ui/TeamTable";
import AddUser from "./AddUser";
import { useUser } from "../authentication/useUser";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const P = styled.p`
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
function CompanyMembers() {
  const { user } = useUser();
  const isAdmin = user.role[user.role.length - 1] === "Admin";
  return (
    <Container>
      {isAdmin && (
        <>
          <P>Invite user: </P>
          <AddUser />
        </>
      )}
      <P>Members: </P>
      <TeamTable />
    </Container>
  );
}

export default CompanyMembers;
