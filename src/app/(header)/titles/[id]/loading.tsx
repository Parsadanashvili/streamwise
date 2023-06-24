import Container from "@/components/Container";

const TitleLoading = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="relative w-full h-[700px] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 z-20">
          <div className="w-full h-full bg-white-100 animate-pulse" />
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-title-gradient z-20" />
        </div>
      </div>
      <Container>
        <div className="bg-white-100 h-10 w-[600px] rounded-full animate-pulse" />
      </Container>
    </div>
  );
};

export default TitleLoading;
