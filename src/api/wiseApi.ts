export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const baseUrl = process.env.API_BASE_URL || "";

type Headers = Record<string, string>;

type Query = Record<string, string>;

const get = async (url: string, query?: Query, options?: RequestInit) => {
  const { headers } = options || {};

  const response = await fetch(
    `${baseUrl}${url}` + new URLSearchParams(query),
    {
      method: "GET",
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...options,
    }
  );
  return response.json();
};

const post = async (url: string, body?: any, options?: RequestInit) => {
  const { headers } = options || {};

  const response = await fetch(`${baseUrl}${url}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...options,
  });
  return response.json();
};

const wiseApi = {
  get,
  post,
};

export default wiseApi;
