import { Language } from "@/types";
import wiseApi, { ApiResponse } from "../wiseApi";

export const getLanguages = async (): Promise<
  ApiResponse<{
    data: Language[];
  }>
> => {
  try {
    return wiseApi.get(`/languages`, undefined, {
      next: {
        revalidate: 60 * 60 * 24,
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
