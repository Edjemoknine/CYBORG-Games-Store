const Container = (props) => {
  return (
    <div className="container max-w-7xl w-full mx-auto  bg-zinc-200 dark:bg-[#27292a] text-[#27292a] dark:text-white">
      {props.children}
    </div>
  );
};

export default Container;
