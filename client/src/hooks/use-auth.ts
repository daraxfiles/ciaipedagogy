import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, getQueryFn } from "@/lib/queryClient";

export type AuthUser = {
  id: number;
  email: string;
  role: string;
  displayName: string;
} | null;

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user = null, isLoading } = useQuery<AuthUser>({
    queryKey: ["/api/auth/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    staleTime: 1000 * 60 * 5,
  });

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await apiRequest("POST", "/api/auth/login", data);
      return res.json() as Promise<AuthUser>;
    },
    onSuccess: (u) => {
      queryClient.setQueryData(["/api/auth/me"], u);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/me"], null);
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    loginPending: loginMutation.isPending,
    logoutPending: logoutMutation.isPending,
    loginError: loginMutation.error,
  };
}
