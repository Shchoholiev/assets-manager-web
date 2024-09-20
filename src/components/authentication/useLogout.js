import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../hooks/useAuth";
export function useLogout() {
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
  });
  return { logout, isPending };
}
