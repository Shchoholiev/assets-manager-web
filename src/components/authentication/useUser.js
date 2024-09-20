import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";

export function useUser() {
  const {getCurrentUser} = useAuth()
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });
  return { isPending, user };
}
