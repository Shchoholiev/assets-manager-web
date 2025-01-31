import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAsset } from "../../services/apiAssets";

export function useAsset() {
  const [searchParams] = useSearchParams();
  const id = !searchParams.get("id") ? null : searchParams.get("id");

  const {
    data: asset,
    isPending,
    error,
  } = useQuery({
    queryKey: ["asset"],
    queryFn: () => getAsset({ id }),
  });

  return { asset, isPending, error };
}
