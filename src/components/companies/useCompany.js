import { useQuery } from "@tanstack/react-query";
import { getCompany } from "../../services/apiCompanies";

export function useCompany() {
  const {
    data: company,
    isPending,
    error,
  } = useQuery({
    queryKey: ["company"],
    queryFn: () => getCompany(),
  });

  return { company, isPending, error };
}
