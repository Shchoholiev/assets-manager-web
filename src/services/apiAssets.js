const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAssets({ search, filter, pageNumber, pageSize }) {
    let queryString = `${BASE_URL}/codeAssets`;
  
    // Add `/byTags` only if there are filters
    if (filter) queryString += `/byTags`;
  
    
    // Start building the query string
    const queryParams = new URLSearchParams();
  
    // Add filter tagIds
    if (filter) {
      filter.split(",").forEach((tagId) => queryParams.append("tagIds", tagId));
    }
  
    // Add pagination parameters
    if (pageNumber) queryParams.append("pageNumber", pageNumber);
    if (pageSize) queryParams.append("pageSize", pageSize);
  
    queryString += `?${queryParams.toString()}`; // Combine the query string
  
    const response = await fetch(queryString);
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  }
  
