const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function signup({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  saveToLocalStorage(data.accessToken, data.refreshToken);
  return data;
}

export async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  saveToLocalStorage(data.accessToken, data.refreshToken);
  return data;
}

function saveToLocalStorage(accessToken, refreshToken) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export async function resetPassword(email) {
  const response = await fetch(`${BASE_URL}/users/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (response.status === 200) {
    return;
  }
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
}

export async function confirmEmail(token) {
  const response = await fetch(`${BASE_URL}/users/verify?token=${token}`);
  if (response.status === 200) {
    console.log("verified")
    return;
  }
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message);
  }
}

export async function confirmNewPassword({ token, newPassword }) {
  const response = await fetch(`${BASE_URL}/users/password-reset`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, newPassword }),
  });
  if (response.status === 200) {
    return;
  }
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
}
