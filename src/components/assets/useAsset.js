import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAsset } from "../../services/apiAssets";
import { getCombinedAsset } from "../../services/apiProjects";

export function useAsset() {
  const { id } = useParams();
  const location = useLocation();
  const isProject = location.pathname.startsWith("/project");
  const {
    data: asset,
    isPending,
    error,
  } = useQuery({
    queryKey: ["asset", id],
    queryFn: () => (!isProject ? getAsset({ id }) : getCombinedAsset({ id })),
    enabled: !!id,
  });

  return { asset, isPending, error };
}
