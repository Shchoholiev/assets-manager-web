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

export async function getCombinedAsset({ id }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BASE_URL}/start-projects/${id}/combined-asset`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
    const error = new Error(data.message || "Failed to compile assets.");
    error.data = data; 
    throw error;
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

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `project-${id}.zip`;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export async function editProjectFolder({ projectId, id, name, parentId }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BASE_URL}/start-projects/${projectId}/folders/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, name, parentId }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function createNewProjectFolder({ projectId, name, parentId }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BASE_URL}/start-projects/${projectId}/folders/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, parentId }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function deleteProjectFolder({ projectId, id }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BASE_URL}/start-projects/${projectId}/folders/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function editProjectFile({
  projectId,
  id,
  text,
  language,
  name,
  parentId,
}) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BASE_URL}/start-projects/${projectId}/code-files/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, text, language, name, parentId }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function createNewProjectFile({
  projectId,
  name,
  parentId,
  language = "Javascript",
  text = "",
}) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BASE_URL}/start-projects/${projectId}/code-files`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, parentId, language, text }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function deleteProjectFile({ projectId, id }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BASE_URL}/start-projects/${projectId}/code-files/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
