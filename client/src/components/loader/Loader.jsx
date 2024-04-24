import styledLoader from "./Loader.module.css";
export const Loader = () => {
  return (
    <div className={styledLoader.containerLoader}>
      <div className={styledLoader.loader}></div>
    </div>
  );
};
