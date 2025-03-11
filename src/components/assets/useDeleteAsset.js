import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteAsset as deleteAssetApi } from "../../services/apiAssets";
import toast from "react-hot-toast";

export function useDeleteAsset() {
  const navigate = useNavigate();
  const { mutate: deleteAsset, isPending } = useMutation({
    mutationFn: deleteAssetApi,
    onSuccess: (deletedAsset) => {
      toast.success(`${deletedAsset.name} deleted successfully`);
      navigate("/my-assets");
    },

    onError: (err) => {
      toast.error(err?.message || "Something went wrong. Try again later");
    },
  });
  return { deleteAsset, isPending };
}
