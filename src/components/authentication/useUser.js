import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";

export function useUser() {
  const {getCurrentUser} = useAuth()
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    refetchInterval: 10 * 60 * 1000,  
    refetchIntervalInBackground: true,
  });
  return { isPending, user };
}
