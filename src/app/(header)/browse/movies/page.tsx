import { getMovies } from "@/api/titles/titles";
import Section from "../../components/Section";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";

const MoviesPage = async () => {
  const { res, ok } = await getMovies();

  return (
    <div className="mt-[120px]">
      <Section title="ფილმები">
        <div className="grid grid-cols-6 items-center gap-7">
          {res.data.map((movie: any) => (
            <Link href={`/titles/${movie.id}`} key={movie.id}>
              <MovieCard
                title={movie.name.ka}
                short_description={movie.plots.ka}
                genres={movie.genres}
                image={movie.posters[0]}
                blurhash={movie.posters.blurhash}
              />
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default MoviesPage;
