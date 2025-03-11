import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import { getAssets } from "../../services/apiAssets";
import { PAGE_SIZE } from "../../utils/constants";

export function useAssets() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  //FILTER
  const filter = !searchParams.get("tagIds")
    ? null
    : searchParams.getAll("tagIds").join(",");

  //TYPE
  let type;
  if (location.pathname.startsWith("/assets")) type = 1;
  else if (location.pathname.startsWith("/company-assets")) type = 2;

  //IS PERSONAL
  const personal = location.pathname.startsWith("/my-assets");

  //SEARCH
  const search = !searchParams.get("search")
    ? null
    : searchParams.get("search");
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
    queryKey: ["assets", filter, pageNumber, pageSize, search, type, personal],
    queryFn: async () => {
      return getAssets({
        filter,
        type,
        personal,
        pageNumber,
        pageSize,
        search,
      });
    },
  });

  return { isPending, assets, error };
}
