import { useQuery } from "@tanstack/react-query";

export function usePrompt() {
  const { data: prompt = "" } = useQuery({
    queryKey: ["starter-prompt"],
    queryFn: () => "",
    staleTime: Infinity,
  });

  return { prompt };
}
