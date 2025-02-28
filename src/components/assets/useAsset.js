

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAsset } from "../../services/apiAssets";

export function useAsset() {
  const { id } = useParams(); 

  const {
    data: asset,
    isPending,
    error,
  } = useQuery({
    queryKey: ["asset", id], 
    queryFn: () => getAsset({ id }),
    enabled: !!id, 
  });

  return { asset, isPending, error };
}
