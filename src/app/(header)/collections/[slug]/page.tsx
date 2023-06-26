import { getCollection } from "@/api/collections/collections";
import { notFound } from "next/navigation";
import { type } from "os";
import MoviesGrid from "../../browse/[type]/components/MoviesGrid";
import Section from "../../components/Section";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";
import { Title } from "@/types";

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

const CollectionPage = async ({ params }: CollectionPageProps) => {
  const { res, ok } = await getCollection(params.slug);

  const collection = ok && res.data.collection;

  if (!ok || !collection) {
    notFound();
  }

  const titles = ok ? res.data.titles : null;

  return (
    <div className="mt-[120px]">
      <Section title={collection.name.ka}>
        <div className="grid grid-cols-6 items-center gap-7">
          {titles?.data.map((title: Title) => (
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
        </div>
      </Section>
    </div>
  );
};

export default CollectionPage;
