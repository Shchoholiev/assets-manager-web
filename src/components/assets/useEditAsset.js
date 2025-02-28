import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { editAsset as editAssetApi } from "../../services/apiAssets";
import toast from "react-hot-toast";

export function useEditAsset() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: editAsset, isPending } = useMutation({
    mutationFn: editAssetApi,
    onSuccess:  async() => {
        await queryClient.invalidateQueries(["asset", id]);
        toast.success("Asset updated successfully");
      navigate(`/my-assets/${id}`);
    },
    onError: (err) => {
      toast.error(err?.message || "Something went wrong! Try again later");
    },
  });
  return { editAsset, isPending };
}
