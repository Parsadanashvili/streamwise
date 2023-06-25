import wiseApi from "../wiseApi";

export const getCollections = async (page = 1) => {
  try {
    return wiseApi.get(
      "/collections",
      { page: String(page) },
      {
        next: {
          revalidate: 60,
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
