import MovieCard from "@/components/MovieCard";
import Slider from "./components/Slider";
import Section from "./components/Section";
import { getLandingCollections } from "@/api/collections";
import Link from "next/link";
import { Collection } from "@/types";

export default async function Home() {
  const { data, ok } = await getLandingCollections();

  return (
    <main className="min-h-screen flex flex-col">
      <Slider />
      <div className="relative mt-[-263px] z-50">
        {ok &&
          data.data.map((collection: Collection) => (
            <Section
              key={collection.id}
              title={collection.name.ka}
              href={`/collections/${collection.slug}`}
            >
              <div className="grid grid-cols-6 items-center gap-7">
                {collection.titles?.map((title: any) => (
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
      </div>
    </main>
  );
}
