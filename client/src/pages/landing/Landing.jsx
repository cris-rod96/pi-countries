import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../components/loader/Loader";
import styledLanding from "./Landing.module.css";
export const Landing = () => {
  const images = [
    {
      image: "back_country.jpg",
      title: "Countries",
      description:
        "Encontrarás las banderas de todos los países del mundo así como información relevante de cada país como pueden ser las Capitales,Población y Área",
    },
    {
      image: "ciclismo.jpg",
      title: "Activities",
      description:
        "Podrás planificar y registrar tus actividades favoritas en el o los países que desees.",
    },
  ];

  const [indexImage, setIndexImage] = useState(0);
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

  return (
    <div className={styledLanding.container}>
      <Loader />
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
          {/* <h3>Escribe tu nombre para continuar</h3> */}
          {/* <input type="text" className={styledLanding.inputName} /> */}
          <Link to={"/home"}>
            <button className={styledLanding.btnHome}>Home Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
