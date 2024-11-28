import { useQuery } from "@tanstack/react-query";
import { getTags } from "../../services/apiTags";

export function useTags() {
  const {
    isPending,
    data: tags,
    error,
  } = useQuery({ queryKey: ["tags"], queryFn: getTags });

  return { isPending, tags, error };
}
