import { Collection, Paginated, Title } from "@/types";
import wiseApi, { ApiResponse } from "../wiseApi";

export const getLandingCollections = async (
  page = 1
): Promise<ApiResponse<Paginated<Collection>>> => {
  try {
    return wiseApi.get(
      "/collections/landing",
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

export const getCollections = async (
  page = 1
): Promise<ApiResponse<Paginated<Collection>>> => {
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

export const getCollection = async (
  slug: string
): Promise<
  ApiResponse<{
    data: {
      collection: Collection;
      titles: Paginated<Title>;
    };
  }>
> => {
  try {
    return wiseApi.get(`/collections/${slug}`, undefined, {
      next: {
        revalidate: 60,
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
