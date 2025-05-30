import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  let refreshPromise = null;

  const refreshAccessToken = async () => {
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = (async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");

      if (!refreshToken) {
        logout();
      }

      const response = await fetch(`${BASE_URL}/tokens/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, refreshToken }),
      });

      if (!response.ok) {
        logout();
      }

      const data = await response.json();
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("accessToken", data.accessToken);

      refreshPromise = null; // Reset after completion
      return data;
    })();

    return refreshPromise;
  };

  const decodeToken = (accessToken = localStorage.getItem("accessToken")) => {
    try {
      const decodedData = jwtDecode(accessToken);
      const cleanedData = {
        name: decodedData[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ],
        id: decodedData[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
        email:
          decodedData[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ],
        role: decodedData[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
        exp: decodedData.exp,
      };
      return cleanedData;
    } catch (err) {
      console.log("Invalid token:", err);
      // throw new Error(`Invalid token: ${err.message}`);
      return null;
    }
  };
  const getCurrentUser = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    let accessToken = localStorage.getItem("accessToken");
    if (!accessToken || !refreshToken) {
      return null;
    }

    let user = decodeToken(accessToken);
    if (!user) return null;
    const currentTime = Math.floor(Date.now() / 1000);
    if (user.exp < currentTime) {
      try {
        const refreshedData = await refreshAccessToken();
        accessToken = refreshedData.accessToken;
        user = decodeToken(accessToken);
      } catch (error) {
        return null;
      }
    }

    return user;
  };

  const logout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  };

  return {
    getCurrentUser,
    refreshAccessToken,
    decodeToken,
    logout,
  };
}
