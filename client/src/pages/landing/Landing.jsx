import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../components/loader/Loader";
import styledLanding from "./Landing.module.css";
import { images } from "../../utils/paths/images";
export const Landing = () => {
  const [indexImage, setIndexImage] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const setActive = (idx) => {
    document
      .querySelector("#slides")
      .querySelectorAll("button")
      .forEach((btn) => {
        if (btn.value !== idx) {
          btn.classList.remove(styledLanding.active);
        } else {
          btn.classList.add(styledLanding.active);
        }
      });
  };

  const handleClick = (e) => {
    const { value } = e.target;
    setIndexImage(value);
    setActive(value);
  };

  useState(() => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 3000);
  }, []);

  return showLoading ? (
    <Loader />
  ) : (
    <div className={styledLanding.container}>
      <div className={styledLanding.slides}>
        <img src={images[indexImage]?.image} alt="" />
        <div className={styledLanding.box}>
          <h3>{images[indexImage]?.title}</h3>
          <p>{images[indexImage]?.description}</p>
        </div>
        <div className={styledLanding.circles} id="slides">
          {images.map((_, idx) => (
            <button
              className={`${idx === 0 ? styledLanding.active : ""}  ${
                styledLanding.btnCircle
              }`}
              key={idx}
              value={idx}
              onClick={handleClick}
            ></button>
          ))}
        </div>
      </div>

      <div className={styledLanding.boxWelcome}>
        <div className={styledLanding.content}>
          <img src={"world_flags.png"} alt="" />
          <Link to={"/home"}>
            <button className={styledLanding.btnHome}>Home Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
