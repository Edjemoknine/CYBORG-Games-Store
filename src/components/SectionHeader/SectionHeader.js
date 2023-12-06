import "./SectionHeader.css";

const SectionHeader = (props) => {
  return (
    <div className="relative mb-3">
      <div className="section-header">
        <h4>{props.children}</h4>
      </div>
    </div>
  );
};

export default SectionHeader;
