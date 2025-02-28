import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { editAsset as editAssetApi } from "../../services/apiAssets";
import toast from "react-hot-toast";

export function useMakePrimaryCodeFile() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { mutate: makePrimaryCodeFile, isPending } = useMutation({
    mutationFn: editAssetApi,
    onSuccess: (updatedAsset) => {
      toast.success("New primary code file is set");
      queryClient.setQueryData(["asset", id], updatedAsset);
    },
    onError: (err) => {
      toast.error(err?.message || "Something went wrong! Try again later");
    },
  });
  return { makePrimaryCodeFile, isPending };
}
