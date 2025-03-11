const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCompany() {
  const token = localStorage.getItem("accessToken");

  let queryString = `${BASE_URL}/companies`;

  const response = await fetch(queryString, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
