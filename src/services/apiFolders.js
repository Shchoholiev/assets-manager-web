const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function editFolder({ id, name, parentId }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/code-assets/folders`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, name, parentId }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function createNewFolder({ name, parentId }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/code-assets/folders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, parentId }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function deleteFolder({ id }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/code-assets/folders/${id}`, {
    method: "DELETE",
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
