const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function askAI({ prompt }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/start-projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/start-projects/${id}/combine`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to combine assets.");
  }

  return data;
}

export async function compileProject({ id }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/start-projects/${id}/compile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to combine assets.");
  }

  return data;
}

export async function downloadZip({ id }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/start-projects/${id}/download`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to download zip");
  }

  // Convert response to blob
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  // Create a temporary anchor element and trigger download
  const a = document.createElement("a");
  a.href = url;
  a.download = `project-${id}.zip`; // Set the filename
  document.body.appendChild(a);
  a.click();

  // Cleanup
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

