import { useForm } from "react-hook-form";
import { useNewPasswordconfirm } from "./useNewPasswordConfirm";
import styled from "styled-components";
import Form from "../../styles/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import Spinner from "../../ui/Spinner";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { useLocation } from "react-router-dom";

const P = styled.p`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 25px;
  font-weight: 300;
  color: var(--yellow);
`;
function NewPasswordConfirmForm() {
  const { register, formState, handleSubmit, reset, getValues } = useForm();
  const { errors } = formState;
  const { confirmNewPassword, isPending } = useNewPasswordconfirm();
  const searchParams = new URLSearchParams(useLocation().search);
  const token = searchParams.get("token");
  function onSubmit({ newPassword }) {
    confirmNewPassword(
      { token, newPassword },
      {
        onError: () =>
          reset({
            newPassword: "",
            newPasswordConfirm: "",
          }),
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <P>
        <HiOutlineLockClosed />
        Create new password
      </P>
      <FormRow error={errors?.password?.message}>
        <Input
          type="password"
          id="newPassword"
          placeholder="New password"
          disabled={isPending}
          {...register("newPassword", {
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
          placeholder="Confirm new password"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().newPassword || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="auth" disabled={isPending}>
          {isPending ? <Spinner /> : "Reset password"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default NewPasswordConfirmForm;
