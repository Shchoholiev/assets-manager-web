import styled from "styled-components";
import Button from "../../styles/Button";
import Input from "../../styles/Input";
import { Link } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../ui/Spinner";
import { useResetPassword } from "./useResetPassword";

const ResetFormLayout = styled.div`
  display: grid;
  grid-gap: 1.8rem;
  width: 20%;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: var(--yellow);
  cursor: pointer;
  &:hover {
    text-shadow: 0px 0px 15px;
    transition: text-shadow 300ms ease;
  }
`;

const Error = styled.span`
  font-size: 15px;
  color: var(--pink);
  text-align: end;
`;
const InputLayout = styled.div`
  display: grid;
  grid-gap: 0.5rem;
`;

function ResetForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { resetPassword, isPending } = useResetPassword();
  function handleClick() {
    if (!email) {
      setError("This field is required");
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      setError("Please provide a valid email address");
    } else {
      setError("");
      resetPassword(email)
    }
  }
  return (
    <ResetFormLayout>
      <h2>Forgot your password?</h2>
      <InputLayout>
        <Input
          type="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
        />
        <Error>{error}</Error>
      </InputLayout>
      <Button variation="auth" disabled={isPending} onClick={handleClick}>
        {isPending ? <Spinner /> : "Reset"}
      </Button>
      <p>
        Back to <StyledLink to="/login">Log in!</StyledLink>{" "}
      </p>
    </ResetFormLayout>
  );
}

export default ResetForm;
