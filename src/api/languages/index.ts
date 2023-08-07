import { Language } from "@/types";
import wiseApi from "../wiseApi";

export const getLanguages = async () =>
  wiseApi.get<{
    data: Language[];
  }>(`/languages`, {
    headers: {
      //@ts-ignore
      next: {
        revalidate: 60 * 60 * 24,
      },
    },
  });
