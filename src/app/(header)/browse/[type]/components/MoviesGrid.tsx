"use client";

import { FC, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { Title } from "@/types";
import { getTitles } from "@/api/titles/titles";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";

interface MoviesGridProps {
  type: "movie" | "series";
  titles: Title[];
}

const MoviesGrid: FC<MoviesGridProps> = ({ type, titles: initialTitles }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [titles, setTitles] = useState<Title[]>(initialTitles);
  const [page, setPage] = useState(2);
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = () => {
    if (gridRef.current && typeof window !== "undefined") {
      const grid = gridRef.current;
      const { bottom } = grid.getBoundingClientRect();
      const { innerHeight } = window;
      setIsInView((prev) => bottom - 400 <= innerHeight);
    }
  };

  useEffect(() => {
    const handleDebouncedScroll = debounce(() => handleScroll(), 200);
    window.addEventListener("scroll", handleDebouncedScroll);
    return () => {
      window.removeEventListener("scroll", handleDebouncedScroll);
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      loadMoreTitles(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const loadMoreTitles = async (page: number) => {
    setIsLoading(true);
    setPage((prev) => prev + 1);

    const { res: newTitles, ok } = await getTitles(type, page);
    if (ok) {
      setTitles((prevTitles) => [...prevTitles, ...newTitles.data]);
      setIsLoading(false);
    }
  };

  return (
    <div ref={gridRef} className="grid grid-cols-6 items-center gap-7">
      {titles.map((title: Title) => (
        <Link href={`/titles/${title.id}`} key={title.id}>
          <MovieCard
            title={title.name.ka}
            short_description={title.plots.ka}
            genres={title.genres ?? []}
            image={title?.posters?.[0] ?? ""}
            blurhash={title?.posters?.blurhash ?? ""}
          />
        </Link>
      ))}
      {isLoading && (
        <>
          <div className="w-full h-[430px] bg-white-100 rounded-3xl cursor-pointer animate-pulse" />
          <div className="w-full h-[430px] bg-white-100 rounded-3xl cursor-pointer animate-pulse" />
          <div className="w-full h-[430px] bg-white-100 rounded-3xl cursor-pointer animate-pulse" />
          <div className="w-full h-[430px] bg-white-100 rounded-3xl cursor-pointer animate-pulse" />
          <div className="w-full h-[430px] bg-white-100 rounded-3xl cursor-pointer animate-pulse" />
          <div className="w-full h-[430px] bg-white-100 rounded-3xl cursor-pointer animate-pulse" />
          <div className="w-full h-[430px] bg-white-100 rounded-3xl cursor-pointer animate-pulse" />
          <div className="w-full h-[430px] bg-white-100 rounded-3xl cursor-pointer animate-pulse" />
          <div className="w-full h-[430px] bg-white-100 rounded-3xl cursor-pointer animate-pulse" />
          <div className="w-full h-[430px] bg-white-100 rounded-3xl cursor-pointer animate-pulse" />
        </>
      )}
    </div>
  );
};

export default MoviesGrid;
