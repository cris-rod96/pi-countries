import styledCountry from "./Country.module.css";
export const Country = (props) => {
  const { name, difficulty, duration, season, deleteActivity, id } = props;

  const imageActivities = {
    Puenting: "/puenting.png",
    Ciclismo: "/ciclismo.jpg",
    Caminata: "/trekking.jpg",
    Camping: "/camping.jpg",
    Climbing: "/climbing.jpg",
  };
  const difficulties = ["Easy", "Regular", "Hard", "Expert", "Legend"];
  const seasons = {
    Verano: "🥵",
    Otoño: "🍂",
    Primavera: "🌺",
    Invierno: "🥶",
  };

  const handleActivity = (e) => {
    deleteActivity(id);
  };

  return (
    <div className={styledCountry.card}>
      <div className={styledCountry.cardHeader}>
        <img
          src={
            imageActivities[name] ? imageActivities[name] : "/actividades.jpg"
          }
          alt=""
        />
        <h3 className={styledCountry.name}>{name}</h3>
      </div>
      <div className={styledCountry.cardDetail}>
        <div className={styledCountry.group}>
          <p className={styledCountry.detail}>Dificultad</p>
          <p className={styledCountry.value}>
            {difficulty} ({difficulties[difficulty - 1]})
          </p>
        </div>
        <div className={styledCountry.group}>
          <p className={styledCountry.detail}>Duración</p>
          <p className={styledCountry.value}>{duration} hrs</p>
        </div>
        <div className={styledCountry.group}>
          <p className={styledCountry.detail}>Temporada</p>
          <p className={styledCountry.value}>
            {season} {seasons[season]}
          </p>
        </div>
        <button className={styledCountry.btnDelete} onClick={handleActivity}>
          Delete
        </button>
      </div>
    </div>
  );
};
