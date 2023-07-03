export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const baseUrl = process.env.API_BASE_URL || "";

type Query = Record<string, string>;

export type ApiResponse<T> =
  | {
      ok: boolean;
      status: number;
      res: T;
    }
  | {
      ok: false;
      status: null;
      res: null;
    };

const get = async (url: string, query?: Query, options?: RequestInit) => {
  const { headers } = options || {};

  const response = await fetch(
    `${baseUrl}${url}?` + new URLSearchParams(query),
    {
      method: "GET",
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...options,
    }
  );

  return {
    ok: response.ok,
    status: response.status,
    res: await response.json(),
  };
};

const post = async (url: string, body?: any, options?: RequestInit) => {
  const response = await fetch(`${baseUrl}${url}`, {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  });

  return {
    ok: response.ok,
    status: response.status,
    res: await response.json(),
  };
};

const wiseApi = {
  get,
  post,
};

export default wiseApi;
