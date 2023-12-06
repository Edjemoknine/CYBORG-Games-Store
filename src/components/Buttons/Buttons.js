import "./Buttons.css";

const Buttons = (props) => {
  return (
    <div className="button w-fit primary-btn">
      <button>{props.text}</button>
    </div>
  );
};
const SecondaryButtons = (props) => {
  return (
    <div className="button secondary-btn">
      <button>{props.text}</button>
    </div>
  );
};

export { SecondaryButtons };
export default Buttons;
