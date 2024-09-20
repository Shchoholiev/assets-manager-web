import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { confirmNewPassword as confirmNewPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useNewPasswordconfirm() {
  const navigate = useNavigate();
  const { mutate: confirmNewPassword, isPending } = useMutation({
    mutationFn: confirmNewPasswordApi,
    onSuccess: () => {
      navigate("/login");
      toast.success("Password was successfully reset");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { confirmNewPassword, isPending };
}
