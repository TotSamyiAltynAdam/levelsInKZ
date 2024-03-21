import {
  ApiError,
  deleteRequest,
  getRequest,
  jwtHeader,
  patchRequest,
  postRequest,
} from "./baseApi";

export async function signIn({ email, password }) {
  const response = await postRequest("/api/auth/signin", {
    body: { email, password },
  });
  if (response.status === 404) {
    throw new ApiError("User not found", response.status);
  }
  return await response.json();
}

export async function AddingSalary(token, data) {
  console.log(JSON.stringify(data));
  const response = await postRequest("/api/salaries", {
    headers: jwtHeader(token),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to add salary");
  }
  return await response.json();
}

export async function getCompanies(token) {
  const response = await getRequest("/api/companies", {
    headers: jwtHeader(token),
  });
  if (!response.ok) {
    throw new ApiError("Not found", response.status);
  }
  return await response.json();
}

export async function getSpecializations(token) {
  const response = await getRequest("/api/specializations", {
    headers: jwtHeader(token),
  });
  if (!response.ok) {
    throw new ApiError("Not found", response.status);
  }
  const data = await response.json();
  return data.slice(0, 5);
}

export async function getSpecializationById(token, id) {
  const response = await getRequest(`/api/containers/${id}`, {
    headers: jwtHeader(token),
    credentials: "include",
  });
  if (!response.ok) {
    throw new ApiError("Unknown error", response.status);
  }
  return await response.json();
}

export async function getLocations(token) {
  const response = await getRequest("/api/locations", {
    headers: jwtHeader(token),
  });
  if (!response.ok) {
    throw new ApiError("Not found", response.status);
  }
  return await response.json();
}

export async function getLocationsById(token, id) {
  const response = await getRequest(`/api/locations/${id}`, {
    headers: jwtHeader(token),
    credentials: "include",
  });
  if (!response.ok) {
    throw new ApiError("Unknown error", response.status);
  }
  return await response.json();
}

export async function getGrades(token) {
  const response = await getRequest("/api/grades", {
    headers: jwtHeader(token),
  });
  if (!response.ok) {
    throw new ApiError("Not found", response.status);
  }
  return await response.json();
}
