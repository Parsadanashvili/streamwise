import MovieCard from "@/components/MovieCard";
import Slider from "./components/Slider";
import Section from "./components/Section";
import { getCollections } from "@/api/collections/collections";
import Link from "next/link";

export default async function Home() {
  const { res } = await getCollections();

  return (
    <main className="min-h-screen flex flex-col">
      <Slider />
      <div className="relative mt-[-263px] z-50">
        <Section title="WATCH ROOMS">
          <div className="grid grid-cols-5 items-center gap-7">
            <div className="w-full h-[205px] bg-error rounded-3xl"></div>
            <div className="w-full h-[205px] bg-error rounded-3xl"></div>
            <div className="w-full h-[205px] bg-error rounded-3xl"></div>
            <div className="w-full h-[205px] bg-error rounded-3xl"></div>
            <div className="w-full h-[205px] bg-error rounded-3xl"></div>
          </div>
        </Section>
        {res.data.map((collection: any) => (
          <Section key={collection.id} title={collection.name.ka}>
            <div className="grid grid-cols-6 items-center gap-7">
              {collection.titles.map((title: any) => (
                <Link href={`/titles/${title.id}`} key={title.id}>
                  <MovieCard
                    title={title.name.ka}
                    short_description={title.plots.ka}
                    genres={title.genres}
                    image={title.posters[0]}
                    blurhash={title.posters.blurhash}
                  />
                </Link>
              ))}
            </div>
          </Section>
        ))}
        {/* <Section title="სუპერგმირები">
          <div className="grid grid-cols-6 items-center gap-7">
            <MovieCard {...movie} />
            <MovieCard {...movie} />
            <MovieCard {...movie} />
            <MovieCard {...movie} />
            <MovieCard {...movie} />
          </div>
        </Section>
        <Section title="ოსკაროსნები">
          <div className="grid grid-cols-6 items-center gap-7">
            <MovieCard {...movie} />
            <MovieCard {...movie} />
            <MovieCard {...movie} />
            <MovieCard {...movie} />
            <MovieCard {...movie} />
            <MovieCard {...movie} />
          </div>
        </Section> */}
      </div>
    </main>
  );
}
