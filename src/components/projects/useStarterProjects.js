import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useStarterProjects() {
  const queryClient = useQueryClient();
  const {
    data: starterProjects,
    isPending,
    error,
  } = useQuery({
    queryKey: ["starter-projects"],
    queryFn: () => queryClient.getQueryData(["starter-projects"]) ?? [],
  });

  return { starterProjects, isPending, error };
}
