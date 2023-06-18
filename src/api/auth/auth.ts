import wiseApi from "../wiseApi";

export const getMe = async (accessToken: string) => {
  try {
    return await wiseApi.get("/auth/user", undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "force-cache",
    });
  } catch (err) {
    return {
      data: null,
    };
  }
};

export const checkUsername = async (username: string) => {
  try {
    return await wiseApi.post("/check-username", { username });
  } catch (err) {
    //
  }
};
