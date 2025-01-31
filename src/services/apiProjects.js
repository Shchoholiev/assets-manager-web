const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function askAI({ prompt }) {
  const response = await fetch(`${BASE_URL}/start-projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function combineAssets({ id }) {
  const response = await fetch(`${BASE_URL}/start-projects/${id}/combine`, {
    method: "POST",
  });

  if (!response.ok) {
    const error = await response.json(); 
    throw new Error(error.message || "Failed to combine assets.");
  }

  return response.status; 
}
