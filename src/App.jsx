import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./styles/GlobalStyles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PasswordReset from "./pages/PasswordReset";
import PageNotFound from "./pages/PageNotFound";
import Assets from "./pages/Assets";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import EmailConfirm from "./pages/EmailConfirm";
import NewPasswordConfirm from "./pages/NewPasswordConfirm";
import { useMediaQuery } from "react-responsive";
import ProjectStartup from "./pages/ProjectStartup";
import ProjectCompile from "./pages/ProjectCompile";
import AssetPage from "./pages/AssetPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/assets" />} />
            <Route path="assets" element={<Assets />} />
            <Route path="assets/:id" element={<AssetPage />} />
            <Route path="users/verify" element={<EmailConfirm />} />
            <Route
              path="users/password-reset"
              element={<NewPasswordConfirm />}
            />
            <Route path="*" element={<PageNotFound />} />

            <Route element={<ProtectedRoute />}>
            <Route path="user" element={<Assets />} />
            <Route path="project/start" element={<ProjectStartup />} />
            <Route path="project/:id/compile" element={<ProjectCompile />} />
            
            </Route>
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reset" element={<PasswordReset />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: !isMobile ? "16px" : "12px",
            maxWidth: "500px",
            padding: !isMobile ? "16px 24px" : "12px 20px",
            marginLeft: !isMobile ? "70%" : "40%",
            backgroundColor: "var(--gray-600)",
            color: "var(--gray-200)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
