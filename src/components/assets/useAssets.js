import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAssets } from "../../services/apiAssets";
import { PAGE_SIZE } from "../../utils/constants";

export function useAssets() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER
  const filter = !searchParams.get("tagIds") ? null : searchParams.getAll("tagIds").join(",");
  

  //SEARCH 
  const search = !searchParams.get("search") ? null : searchParams.get("search")
  //PAGINATION
  const pageNumber =
    !searchParams.get("page") || Number(searchParams.get("page")) < 1
      ? 1
      : Number(searchParams.get("page"));
  const pageSize =
    !searchParams.get("size") || Number(searchParams.get("size")) < 1
      ? PAGE_SIZE
      : Number(searchParams.get("size"));

  //QUERY
  const {
    isPending,
    data: assets,
    error,
  } = useQuery({
    queryKey: ["assets", filter,  pageNumber, pageSize, search],
    queryFn: () => getAssets({ filter, pageNumber, pageSize, search }),
  });

  return { isPending, assets, error };
}
