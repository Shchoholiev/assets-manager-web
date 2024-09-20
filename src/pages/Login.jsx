import styled from "styled-components";
import LoginLogo from "../components/authentication/LoginLogo";
import LoginForm from "../components/authentication/LoginForm";

const LoginLayout = styled.main`
  min-height: 90vh;
  width: 90vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`;
function Login() {
  return (
    <LoginLayout>
      <LoginLogo />
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
