import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { confirmEmail as confirmEmailApi } from "../services/apiAuth";
import cube from "/cube.svg";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5%;
  justify-content: center;
  height: 50rem;
  align-items: center;
  font-size: 30px;
  font-weight: bolder;
  @media (max-width: 768px) {
    font-size: 20px;
    height: 40rem;
  }
  @media (max-width: 425px) {
    font-size: 18px;
    height: 35rem;
  }
`;
const PSuccess = styled.p`
  color: var(--teal);
`;
const PError = styled.p`
  color: var(--pink);
`;
function EmailConfirm() {
  const [status, setStatus] = useState("pending");
  const searchParams = new URLSearchParams(useLocation().search);
  const token = searchParams.get("token");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    if (token) {
      hasFetched.current = true;
      confirmEmailApi(token)
        .then(() => {
          setStatus("success");
        })
        .catch(() => {
          setStatus("error");
        });
    } else {
      setStatus("error");
    }
  }, [token]);

  return (
    <Container>
      {status === "pending" && <Spinner size="70" color="--teal" />}
      {status === "success" && (
        <>
          <img src={cube} alt="Cube" />
          <PSuccess>Email confirmed successfully!</PSuccess>
        </>
      )}
      {status === "error" && (
        <>
          <img src={cube} alt="Cube" />
          <PError>{`Something went wrong while confirming email :( `}</PError>
        </>
      )}
    </Container>
  );
}

export default EmailConfirm;
