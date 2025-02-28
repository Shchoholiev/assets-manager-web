const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTags({ search }) {
  const token = localStorage.getItem("accessToken");

  let queryString = `${BASE_URL}/tags?pageNumber=1&pageSize=15`;
  
  if (search) {
    queryString += `&searchString=${encodeURIComponent(search)}`;
  }

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
