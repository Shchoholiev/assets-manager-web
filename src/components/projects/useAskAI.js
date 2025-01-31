import { useMutation, useQueryClient } from "@tanstack/react-query";
import { askAI as askAIApi } from "../../services/apiProjects";
import toast from "react-hot-toast";

export function useAskAI() {
  const queryClient = useQueryClient();
  const { mutate: askAI, isPending } = useMutation({
    mutationFn: askAIApi,
    onSuccess: (data) => {
        queryClient.setQueryData(["starter-projects"], data);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { askAI, isPending };
}
