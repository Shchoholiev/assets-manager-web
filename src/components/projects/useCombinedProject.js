import { useQuery } from "@tanstack/react-query";
import { combineAssets } from "../../services/apiProjects";
import { useParams } from "react-router-dom";

export function useCombinedProject() {
  const { id } = useParams();
  const {
    data: combinedProject,
    isPending,
    error,
  } = useQuery({
    queryKey: ["combined-project"],
    queryFn: () => combineAssets({ id }),
  });

  return { combinedProject, isPending, error };
}
