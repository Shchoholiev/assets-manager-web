import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../styles/Input";
import styled from "styled-components";
import Form from "../../styles/Form";
import Button from "../../styles/Button";
import { Link } from "react-router-dom";
import { useLogin } from "./useLogin";
import Spinner from "../../ui/Spinner";

const P = styled.p`
  font-size: 25px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
  @media (max-width: 425px) {
    font-size: 18px;
  }
`;
const StyledLink = styled(Link)`
  font-size: 14px;
  margin-bottom: 3%;
  justify-self: end;
  &:hover {
    color: var(--yellow);
    transition: ease-in-out 300ms;
  }
`;

function LoginForm() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { isPending, login } = useLogin();
  function onSubmit({ email, password }) {
    login(
      {
        email,
        password,
      },
      {
        onError: () =>
          reset({
            email: "",
            password: "",
          }),
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <P>Log in</P>

      <FormRow error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          placeholder="Enter email"
          disabled={isPending}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>
      <FormRow error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          disabled={isPending}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow>
        <StyledLink to="/reset">Forgot your password?</StyledLink>
      </FormRow>
      <FormRow>
        <Button variation="auth" disabled={isPending}>
          {isPending ? <Spinner /> : "Log in"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
