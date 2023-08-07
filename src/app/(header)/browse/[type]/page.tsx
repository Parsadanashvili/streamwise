import { getTitles } from "@/api/titles";
import Section from "../../components/Section";
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

  const { data, ok } = await getTitles(type === "movies" ? "movie" : "series");

  return (
    <div className="mt-[120px]">
      <Section title="ფილმები">
        <MoviesGrid
          type={type === "movies" ? "movie" : "series"}
          titles={ok ? data.data : []}
        />
      </Section>
    </div>
  );
};

export default BrowsePage;
