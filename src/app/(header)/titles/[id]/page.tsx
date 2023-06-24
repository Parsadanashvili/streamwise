import { getTitle } from "@/api/titles/titles";
import { notFound } from "next/navigation";
import Cover from "./components/Cover";
import Container from "@/components/Container";

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
      <Container>
        <h1 className="text-3xl text-white font-bold case-on">
          {title.name.ka}
        </h1>
      </Container>
    </div>
  );
};

export default TitlePage;
