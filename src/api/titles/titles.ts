import wiseApi from "../wiseApi";

export const getMovies = async (type = "movie") => {
  try {
    return await wiseApi.get(
      "/titles",
      {
        type,
      },
      {
        cache: "no-cache",
      }
    );
  } catch (err) {
    return {
      ok: false,
      status: null,
      res: null,
    };
  }
};

export const getTitle = async (id: string) => {
  try {
    return await wiseApi.get(`/titles/${id}`, undefined, {
      cache: "no-cache",
    });
  } catch (err) {
    return {
      ok: false,
      status: null,
      res: null,
    };
  }
};