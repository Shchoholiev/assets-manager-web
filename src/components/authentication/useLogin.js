import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { decodeToken } = useAuth();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const user = decodeToken(data.accessToken);
      queryClient.setQueryData(["user"], user);
      navigate("/assets", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { login, isPending };
}
