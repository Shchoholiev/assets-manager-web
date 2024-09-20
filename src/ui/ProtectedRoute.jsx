import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../components/authentication/useUser";
import { useEffect } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isPending, user } = useUser();

  useEffect(
    function () {
      if (!user && !isPending) navigate("/");
    },
    [isPending, navigate, user]
  );
  if (isPending)
    return (
      <FullPage>
        <Spinner size="70" color="--teal" />
      </FullPage>
    );
  return <Outlet />;
}

export default ProtectedRoute;
