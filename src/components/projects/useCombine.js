import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { combineAssets } from "../../services/apiProjects";
import toast from "react-hot-toast";

export function useCombine() {
  const navigate = useNavigate();
  const { mutate: combine, isPending } = useMutation({
    mutationFn: combineAssets,
    onSuccess: (_, { id }) => {
      navigate(`/project/${id}/compile`);
      toast.success("Assets were combined successfully!")
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { combine, isPending };
}
