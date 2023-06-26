export type Languagable<T> = {
  [key: string]: T;
};

export interface User {
  avatar: string;
  username: string;
}

export interface Collection {
  id: number;
  name: Languagable<string>;
  description: Languagable<string> | null;
  titles?: Title[];
}

export interface Cover {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  blurhash: string | null;
}

export interface Poster {
  0: string;
  1: string;
  blurhash: string | null;
}

export interface Title {
  id: number;
  name: Languagable<string>;
  type: "movie" | "series";
  imdb_rating: number | null;
  release_date: string | null;
  plots: Languagable<string>;
  duration: number | null;
  budget: number | null;
  income: number | null;
  languages?: Language[];
  genres?: Genre[];
  directors?: Creditable[];
  writers?: Creditable[];
  producers?: Creditable[];
  actors?: Creditable[];
  seasons?: Season[];
  episodes?: Episode[];
  posters?: Poster;
  covers?: Cover;
  featured: boolean;
  imdb_id: string;
}

export interface Genre {
  id: number;
  name: Languagable<string>;
}

export interface Language {
  id: number;
  name: Languagable<string>;
  name_turned: Languagable<string> | null;
  code: string;
}

export interface Person {
  id: number;
  name: Languagable<string>;
  description: Languagable<string> | null;
  gender: string | null;
  birth_date: string | null;
  birth_place: string | null;
  zodiac_sign: string | null;
  height: number | null;
  death_date: string | null;
  death_place: string | null;
}

export interface Creditable extends Person {
  character: string | null;
}

export interface Season {
  id: number;
  name: Languagable<string>;
  release_date: string | null;
  number: number;
  title?: Title;
  episodes?: Episode[];
}

export interface Episode {
  id: number;
  name: Languagable<string>;
  release_date: string | null;
  number: number;
  title?: Title;
  season?: Season;
}
export interface Video {
  id: number;
  name: string;
  language: string;
  quality: string;
  duration: number;
  title?: Title;
  season?: Season;
  episode?: Episode;
}

export interface Paginated<T> {
  current_page: number;
  data: T[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}
