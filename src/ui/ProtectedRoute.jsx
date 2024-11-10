import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../components/authentication/useUser";
import { useEffect } from "react";



function ProtectedRoute() {
  const navigate = useNavigate();
  const { isPending, user } = useUser();

  useEffect(
    function () {
      if (!user && !isPending) navigate("/");
    },
    [isPending, navigate, user]
  );
  
  return <Outlet />;
}

export default ProtectedRoute;
