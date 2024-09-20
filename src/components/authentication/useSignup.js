import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  signup as signupApi } from "../../services/apiAuth";
import {useAuth} from '../../hooks/useAuth'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {decodeToken} = useAuth()
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      const user = decodeToken(data.accessToken);
      queryClient.setQueryData(["user"], user);
      navigate("/assets", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isPending };
}
