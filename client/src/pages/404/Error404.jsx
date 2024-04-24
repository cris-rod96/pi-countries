import { Link } from "react-router-dom";
import styled404 from "./Error404.module.css";
import { Loader } from "../../components/loader/Loader";
import { useEffect, useState } from "react";
export const Error404 = () => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 3000);
  }, []);
  return showLoading ? (
    <Loader />
  ) : (
    <div className={styled404.container404}>
      <div className={styled404.content}>
        <div className={styled404.img}>
          <img src="/perdido.png" alt="" />
          <div className={styled404.message}>
            <h1>404</h1>
            <h2>Page not found</h2>
          </div>
        </div>

        <div className={styled404.text}>
          <p>
            Al parecer te has perdido un poco. Para volver a la página de inicio
            haz click en el siguiente botón.
          </p>
          <Link to={"/home"}>
            <button className={styled404.btnBack}>Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
