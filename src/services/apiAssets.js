const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAssets({
  search,
  type,
  filter,
  personal = false,
  pageNumber,
  pageSize,
}) {
  let queryString = `${BASE_URL}/code-assets`;
  const token = localStorage.getItem("accessToken");

  // Start building the query string
  const queryParams = new URLSearchParams();

  // Add filter tagIds
  if (filter) {
    filter.split(",").forEach((tagId) => queryParams.append("tagIds", tagId));
  }

  //Add search
  if (search) queryParams.append("SearchString", search);

  //Add asset type
  if (type) queryParams.append("AssetType", type);

  //Add is personal
  queryParams.append("IsPersonal", personal);

  // Add pagination parameters
  if (pageNumber) queryParams.append("pageNumber", pageNumber);
  if (pageSize) queryParams.append("pageSize", pageSize);

  queryString += `?${queryParams.toString()}`; // Combine the query string

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

export async function getAsset({ id }) {
  const token = localStorage.getItem("accessToken");
  let queryString = `${BASE_URL}/code-assets/${id}`;
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

export async function editAsset({
  id,
  description,
  name,
  tagsIds,
  assetType,
  language,
  rootFolderId,
  primaryCodeFileId,
}) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}/code-assets`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      description,
      name,
      tagsIds,
      assetType,
      language,
      rootFolderId,
      primaryCodeFileId,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
