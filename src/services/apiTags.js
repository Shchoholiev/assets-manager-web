const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTags() {
  const response = await fetch(`${BASE_URL}/tags?pageNumber=1&pageSize=15`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
