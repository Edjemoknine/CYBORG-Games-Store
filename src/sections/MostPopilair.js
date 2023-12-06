import { SectionHeader, SectionWrapper } from "../components/index";

const MostPopilair = ({ cards, title }) => {
  return (
    <>
      <SectionWrapper>
        {title && <SectionHeader>{title} </SectionHeader>}

        {cards}
      </SectionWrapper>
    </>
  );
};

export default MostPopilair;
