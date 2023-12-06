import "./SectionWrapper.css";

const SectionWrapper = (props) => {
  return (
    <div className="section-wrapper h-full overflow-hidden relative mini bg-zinc-300 shadow-sm dark:bg-[#1f2122] text-[#27292a] dark:text-white">
      {props.children}
    </div>
  );
};

export default SectionWrapper;
