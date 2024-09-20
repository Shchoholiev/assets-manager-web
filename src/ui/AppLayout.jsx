import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 95vw;
  @media (max-width: 1024px) {
    width: 100vw;
  }
`;
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Outlet />
    </StyledAppLayout>
  );
}

export default AppLayout;
