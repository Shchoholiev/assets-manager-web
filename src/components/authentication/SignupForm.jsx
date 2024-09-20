import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../styles/Input";
import styled from "styled-components";
import Form from "../../styles/Form";
import Button from "../../styles/Button";
import { useSignup } from "./useSignup";
import Spinner from "../../ui/Spinner";


const P = styled.p`
  font-size: 25px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
`;

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isPending } = useSignup();
  function onSubmit({ name, email, password }) {
    signup(
      { name, email, password },
      {
        onError: () =>
          reset({
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
          }),
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <P>Sign up</P>
      <FormRow error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          placeholder="Create username"
          disabled={isPending}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
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
      <FormRow error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          placeholder="Confirm password"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="auth" disabled={isPending}>
          {isPending ? <Spinner /> : "Register"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
