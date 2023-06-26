import { getTitle } from "@/api/titles/titles";
import { notFound } from "next/navigation";
import Cover from "./components/Cover";
import Button from "@/components/Button";
import { SignalIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import Poster from "./components/Poster";
import Section from "../../components/Section";
import MovieCard from "@/components/MovieCard";

const movie = {
  title: "სპაიდერმენი: სახლისკენ გზა არ არის",
  short_description:
    "ყველას და საკუთარი თავის გასაკვირად, პო, ჭარბწონიანი, მოუხერხებელი პანდა, მშვიდობის ველის მფარველად აირჩიეს. მალე მას საკუთარი შესაძლებლობების გამოცდა მოუწევს, როდესაც ხეობას მტერი მიუახლოვდება.",
  image:
    "https://www.figma.com/file/33eljP2axeR66ojX7TdAC4/image/d1fa31158d2c1de13121a04942fe86f1f4493eb1?fuid=1086042922435748998",
};

interface TitlePageProps {
  params: {
    id: string;
  };
}

const TitlePage = async ({ params }: TitlePageProps) => {
  const { res, ok } = await getTitle(params.id);

  if (!ok) {
    notFound();
  }

  const title = res.data;

  return (
    <div className="w-full min-h-screen">
      <Cover covers={title.covers} />
      <div className="w-full absolute -mt-[278px] z-40 text-white px-20 animate-mainSliderInfoFadeUp">
        <div className="flex items-start gap-20">
          <Poster image={title.posters[0]} alt={title.name.ka} />

          <div className="w-full py-14 flex flex-col gap-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              {title.genres.map((genre: any) => (
                <div
                  key={genre.id}
                  className="flex py-2 px-4 items-center justify-center rounded-full bg-[rgba(255,255,255,0.10)] backdrop-blur-[6px]"
                >
                  <span className="text-white text-base leading-5">
                    {genre.name.ka}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col flex-start gap-2 w-full">
              <div className="flex items-center gap-3 text-base text-white-400 leading-5 font-normal">
                <span>{new Date(title.release_date).getFullYear()}</span>

                <span className="text-white-200">•</span>

                <span>{(title.duration / 60).toFixed(0)}ს</span>

                <span className="text-white-200">•</span>

                <span>PG13</span>
              </div>
              <div>
                <span className="text-white-400 text-base font-normal leading-tight">
                  რეჟისორი:{" "}
                </span>
                <span className="text-white text-base font-normal leading-tight">
                  {title.directors
                    .map((director: any) => director.name.ka)
                    .join(", ")}
                </span>
              </div>
              <div className="text-white text-5xl font-bold leading-none case-on uppercase">
                {title.name.ka}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button startIcon={SignalIcon}>უყურეთ ერთად</Button>
              <Button startIcon={PlayIcon} variant="outline">
                უყურე ახლავე
              </Button>
            </div>
            <div className="text-white text-lg font-normal">
              {title.plots.ka}
            </div>
          </div>

          <div className="min-w-[380px] py-14 animate-fadeIn">
            <div className="text-white text-[32px] font-medium leading-10 case-on">
              ქასთი
            </div>

            <div className="flex-col justify-start items-start gap-5 inline-flex mt-7">
              {title.actors.map((actor: any) => (
                <div
                  key={actor.id}
                  className="flex-col justify-start items-start gap-1 flex"
                >
                  <div className="text-white-400 text-xl font-normal leading-normal">
                    {actor.name?.ka}
                  </div>
                  <div className="text-white-200 text-xl font-normal leading-normal">
                    {actor.character?.ka}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Section title="დამიჯერე მოგეწონება">
            <div className="grid grid-cols-5 items-center gap-7">
              <MovieCard {...movie} />
              <MovieCard {...movie} />
              <MovieCard {...movie} />
              <MovieCard {...movie} />
              <MovieCard {...movie} />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default TitlePage;
