import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createAsset as createAssetApi } from "../../services/apiAssets";

export function useCreateAsset() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createAsset, isPending } = useMutation({
    mutationFn: createAssetApi,
    onSuccess: (asset) => {
        toast.success("Asset was created successfully!")
      queryClient.setQueryData(["asset", asset.id], asset);
      navigate(`/my-assets/${asset.id}/edit`, { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createAsset, isPending };
}
