import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changeMemberRole as changeMemberRoleApi } from "../../services/apiCompanies";

export function useChangeRole() {
  const queryClient = useQueryClient();

  const { mutate: changeMemberRole, isPending } = useMutation({
    mutationFn: changeMemberRoleApi,
    onSuccess: (updatedUser) => {
      toast.success(`${updatedUser.name} role was successfully changed!`);
      queryClient.setQueryData(["company"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          users: oldData.users.map((oldUser) =>
            oldUser.id === updatedUser.id ? updatedUser : oldUser
          ),
        };
      });
    },
    onError: () => {
      toast.error( "Something went wrong! try again later");
    },
  });

  return { changeMemberRole, isPending };
}
