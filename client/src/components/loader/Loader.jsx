import { useState } from "react";
import styledLoader from "./Loader.module.css";
export const Loader = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1500);
  {
    return loading ? (
      <div className={styledLoader.containerLoader}>
        <div className={styledLoader.loader}></div>
      </div>
    ) : null;
  }
};
