import { getTitles } from "@/api/titles/titles";
import Section from "../../components/Section";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import MoviesGrid from "./components/MoviesGrid";

interface BrowsePageProps {
  params: {
    type: string;
  };
}

const BrowsePage = async ({ params }: BrowsePageProps) => {
  const { type } = params;

  if (type !== "movies" && type !== "series") {
    notFound();
  }

  const { res, ok } = await getTitles(type === "movies" ? "movie" : "series");

  return (
    <div className="mt-[120px]">
      <Section title="ფილმები">
        <MoviesGrid
          type={type === "movies" ? "movie" : "series"}
          titles={ok ? res.data : []}
        />
        <div className="grid grid-cols-6 items-center gap-7"></div>
      </Section>
    </div>
  );
};

export default BrowsePage;
