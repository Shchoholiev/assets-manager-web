import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import { useUser } from "../components/authentication/useUser";
import Spinner from "./Spinner";
import Menu from "./Menu";
import Footer from "./Footer";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr auto ;
  width: 90vw;
  min-height: 100vh;
  margin: 0 auto;
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
  const { isPending, user } = useUser();
  if (isPending)
    return (
      <FullPage>
        <Spinner size="70" color="--teal" />
      </FullPage>
    );

  return (
    <>
      <StyledAppLayout>
        <Header />
        {user && <Menu />}
        <Outlet />
      </StyledAppLayout>
      {user && <Footer />}
    </>
  );
}

export default AppLayout;
