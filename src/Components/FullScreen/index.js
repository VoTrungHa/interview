import "./styles.scss";

const Fullscreen = ({ children }) => {
  return (
    <div className={"mod-fullScreen"}>
      <div className={"content"}>{children}</div>
    </div>
  );
};

export default Fullscreen;
