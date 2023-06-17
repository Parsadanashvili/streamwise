import MovieCard from "@/components/MovieCard";
import Slider from "./components/Slider";
import Section from "./components/Section";

const movie = {
  title: "სპაიდერმენი: სახლისკენ გზა არ არის",
  short_description:
    "ყველას და საკუთარი თავის გასაკვირად, პო, ჭარბწონიანი, მოუხერხებელი პანდა, მშვიდობის ველის მფარველად აირჩიეს. მალე მას საკუთარი შესაძლებლობების გამოცდა მოუწევს, როდესაც ხეობას მტერი მიუახლოვდება.",
  image:
    "https://www.figma.com/file/33eljP2axeR66ojX7TdAC4/image/d1fa31158d2c1de13121a04942fe86f1f4493eb1?fuid=1086042922435748998",
};

export default function Home() {
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
        <Section title="სუპერგმირები">
          <div className="grid grid-cols-6 items-center gap-7">
            <MovieCard {...movie} />
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
        </Section>
      </div>
    </main>
  );
}
