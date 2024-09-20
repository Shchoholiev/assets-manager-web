import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useResetPassword() {
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      navigate("/login");
      toast.success("Check your email for password reset instructions");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { resetPassword, isPending };
}
