export const baseUrl = process.env.REACT_APP_API_URL;

const jsonHeader = {
  "Content-Type": "application/json"
};

export const jwtHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

export class ApiError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}

async function httpRequest(url, options) {
  try {
    const response = await fetch(`${baseUrl}${url}`, options);
    if (response.status >= 500) {
      throw new Error("Сервер работает неправильно, пожалуйста, повторите попытку позже");
    }

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Сеть работает неправильно, пожалуйста, проверьте конфигурацию сети");
  }
}

export async function getRequest(path, options) {
  const queryParams = options && options.query ? `?${new URLSearchParams(options.query).toString()}` : '';
  const requestUrl = `${path}${queryParams}`;

  return await httpRequest(requestUrl, options);
}

export async function postRequest(path, options) {
  const requestOptions = {
    ...options,
    method: "POST",
    headers: {
      ...options?.headers,
      ...jsonHeader,
    },
    body: options?.body ? JSON.stringify(options.body) : null,
  };

  return await httpRequest(path, requestOptions);
}

export async function deleteRequest(path, options){
  const requestOptions = {
    ...options,
    method: "DELETE",
    headers: {
      ...options?.headers,
      ...jsonHeader,
    },
    body: options?.body ? JSON.stringify(options.body) : null,
  };

  return await httpRequest(path, requestOptions);
}

export async function patchRequest(path, options){
  const requestOptions = {
    ...options,
    method: "PATCH",
    headers: {
      ...options?.headers,
      ...jsonHeader,
    },
    body: options?.body ? JSON.stringify(options.body) : null,
  };
  const queryParams = options && options.query ? `?${new URLSearchParams(options.query).toString()}` : '';
  const requestUrl = `${path}${queryParams}`;

  return await httpRequest(requestUrl, requestOptions);
}

export async function postFormData(path, options) {
  const requestOptions = {
    ...options,
    method: "POST",
  };

  return await httpRequest(path, requestOptions);
}