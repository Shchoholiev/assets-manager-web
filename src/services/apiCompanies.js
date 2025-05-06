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

export async function createCompany({ name, description }) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}/companies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function removeCompanyMember({ userId }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/companies/users/${userId}`, {
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

export async function addMember({ email }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/companies/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function changeMemberRole({ userId, roleName }) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/companies/users/${userId}/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      roleName,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
