import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import { useUser } from "../components/authentication/useUser";
import Spinner from "./Spinner";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 90vw;
  justify-self: center;
  margin-bottom: 3rem;
  @media (max-width: 1024px) {
    width: 95vw;
  }


`;
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function AppLayout() {
  const { isPending } = useUser();
  if (isPending)
    return (
      <FullPage>
        <Spinner size="70" color="--teal" />
      </FullPage>
    );

  return (
    <StyledAppLayout>
      <Header />
      <Outlet />
    </StyledAppLayout>
  );
}

export default AppLayout;
