import requestly from "requestly";
// import { RequestResponse } from "requestly/lib/types";

export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const baseUrl = process.env.API_BASE_URL || "";

// export type ApiResponse<T> =
//   | RequestResponse<T>
//   | {
//       ok: false;
//       data: {
//         error?: string;
//       };
//     };

const wiseApi = requestly.create({
  baseUrl,
  userAgent: "streamwise-web",
  headers: {
    ...defaultHeaders,
  },
  storeCookies: false,
});

export default wiseApi;
