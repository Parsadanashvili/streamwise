import { Collection, Paginated, Title } from "@/types";
import wiseApi from "../wiseApi";

export const getLandingCollections = async (page = 1) =>
  wiseApi.get<Paginated<Collection>>("/collections/landing", {
    params: {
      page: String(page),
    },
    headers: {
      //@ts-ignore
      next: {
        revalidate: 60,
      },
    },
  });

export const getCollections = async (page = 1) =>
  wiseApi.get<Paginated<Collection>>("/collections", {
    params: {
      page: String(page),
    },
    headers: {
      //@ts-ignore
      next: {
        revalidate: 60,
      },
    },
  });

export const getCollection = async (slug: string) =>
  wiseApi.get<{
    data: {
      collection: Collection;
      titles: Paginated<Title>;
    };
  }>(`/collections/${slug}`, {
    headers: {
      //@ts-ignore
      next: {
        revalidate: 60,
      },
    },
  });
