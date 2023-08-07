import requestly from "requestly";
import { RequestResponse } from "requestly/lib/types";

export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const baseUrl = process.env.API_BASE_URL || "";

type Params = Record<string, string>;

export type ApiResponse<T> = RequestResponse<T>;

const wiseApi = requestly.create({
  baseUrl,
  userAgent: "streamwise-web",
  headers: {
    ...defaultHeaders,
  },
  storeCookies: false,
});

// const get = async <T>(
//   url: string,
//   params?: Params,
//   options?: RequestInit
// ): Promise<ApiResponse<T>> => {
//   const { headers } = options || {};

//   const response = await client.get<T>(url, {
//     params,
//     ...options,
//     //@ts-ignore
//     headers,
//   });

//   return response;
// };

// const post = async <T>(
//   url: string,
//   body?: any,
//   options?: RequestInit
// ): Promise<ApiResponse<T>> => {
//   const { headers } = options || {};

//   const response = await client.post<T>(url, {
//     body,
//     //@ts-ignore
//     headers,
//     ...options,
//   });

//   return response;
// };

// const wiseApi = {
//   get,
//   post,
// };

export default wiseApi;
