import { useQuery } from "@tanstack/react-query";
import { getTags } from "../../services/apiTags";
import { useSearchParams } from "react-router-dom";

export function useTags() {
  const [searchParams] = useSearchParams();
  const search = !searchParams.get("searchTags")
    ? null
    : searchParams.get("searchTags");

  const {
    isPending,
    data: tags,
    error,
  } = useQuery({
    queryKey: ["tags", search],
    queryFn: () => getTags({ search }),
  });

  return { isPending, tags, error };
}
