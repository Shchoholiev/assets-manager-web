import SignupForm from "../components/authentication/SignupForm";
import AuthLayout from "../ui/AuthLayout";
import AuthLogo from "../components/authentication/AuthLogo";

function Signup() {
  return (
    <AuthLayout>
      <AuthLogo type="signup" />
      <SignupForm />
    </AuthLayout>
  );
}

export default Signup;
