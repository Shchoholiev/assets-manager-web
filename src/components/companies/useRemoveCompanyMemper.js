import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeCompanyMember as removeCompanyMemberApi } from "../../services/apiCompanies";

export function useRemoveCompanyMember() {
  const queryClient = useQueryClient();
  const { mutate: removeCompanyMember, isPending } = useMutation({
    mutationFn: removeCompanyMemberApi,
    onSuccess: (removedUser) => {
      toast.success(`${removedUser.name} was removed successfully`);
      queryClient.setQueryData(["company"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          users: oldData.users.filter((user) => user.id !== removedUser.id),
        };
      });
    },

    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
  });
  return { removeCompanyMember, isPending };
}
