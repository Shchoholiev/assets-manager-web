import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addMember as addMemberApi } from "../../services/apiCompanies";

export function useAddCompanyMember() {
  const queryClient = useQueryClient();

  const { mutate: addMember, isPending } = useMutation({
    mutationFn: addMemberApi,
    onSuccess: (user) => {
      toast.success(`${user.name} was successfully added to the company!`);
      queryClient.setQueryData(["company"], (oldData) => {
        if (!oldData) return oldData;
        return { ...oldData, users: [...oldData.users, user] };
      });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong! try again later");
    },
  });
  return { addMember, isPending };
}
