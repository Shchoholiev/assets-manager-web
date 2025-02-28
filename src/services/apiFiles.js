const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function editFile({ id, text, language, name, parentId }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/code-assets/codefiles`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, text, language, name, parentId }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function createNewFile({
  name,
  parentId,
  language = "Javascript",
  text = "",
}) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/code-assets/codefiles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, parentId, language, text }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function deleteFile({ id }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/code-assets/codefiles/${id}`, {
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
