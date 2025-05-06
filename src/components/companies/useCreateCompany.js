import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createCompany as createCompanyApi } from "../../services/apiCompanies";

export function useCreateCompany() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createCompany, isPending } = useMutation({
    mutationFn: createCompanyApi,
    onSuccess: (company) => {
      queryClient.removeQueries(["user"]);
      navigate("/login", { replace: true });
      toast.success(`Company was successfully created!\n Log in to proceed`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createCompany, isPending };
}
