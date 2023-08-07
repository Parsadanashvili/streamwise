import { User } from "@/types";
import wiseApi from "../wiseApi";

export const getMe = async (accessToken: string) =>
  wiseApi.get<{ data: User }>("/auth/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const checkUsername = async (username: string) =>
  wiseApi.post<{
    data: {
      username: string;
      available: boolean;
    };
  }>("/check-username", {
    body: {
      username,
    },
  });
