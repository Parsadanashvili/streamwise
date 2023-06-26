import wiseApi from "../wiseApi";

export const getMovies = async (type = "movie") => {
  try {
    return await wiseApi.get(
      "/titles",
      {
        type,
      },
      {
        next: {
          revalidate: 60 * 5,
        },
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
      next: {
        revalidate: 60 * 60,
      },
    });
  } catch (err) {
    return {
      ok: false,
      status: null,
      res: null,
    };
  }
};
