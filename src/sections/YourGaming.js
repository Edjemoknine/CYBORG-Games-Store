import { GameItem, SectionHeader, SectionWrapper } from "../components/index";

const YourGaming = ({ games, title }) => {
  const Games = games.map((card) => {
    return <GameItem key={card.id} card={card} />;
  });
  return (
    <>
      <SectionWrapper>
        <SectionHeader>
          Your <span className="text-rose-500">{title}</span> Games{" "}
        </SectionHeader>
        <div
          className="grid gap-3 grid-cols-1 grid-col-[repeat(auto-fit,minmax(250px,1fr))]"
          // style={{ gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}
        >
          {Games}
        </div>
      </SectionWrapper>
    </>
  );
};

export default YourGaming;
