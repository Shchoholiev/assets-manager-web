import LoginForm from "../components/authentication/LoginForm";
import AuthLayout from "../styles/AuthLayout";
import AuthLogo from "../components/authentication/AuthLogo";

function Login() {
  return (
    <AuthLayout>
      <AuthLogo type='login' />
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
