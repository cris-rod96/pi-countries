import { useNavigate } from "react-router-dom";
import styledCard from "./Card.module.css";
export const Card = ({ country }) => {
  const navigate = useNavigate();
  const detailCountry = (id) => {
    navigate(`/detail/${id}`);
  };
  return (
    <div
      className={styledCard.card}
      id={country.id}
      onClick={() => {
        detailCountry(country.id);
      }}
    >
      <div className={styledCard.cardHeader}>
        <img src={country.flag} alt="" />
        <span className={styledCard.population}>{country.population} habs</span>
        <span className={styledCard.capital}>
          {country.capital !== "No Data" ? country.capital : ""}
        </span>
        <span
          className={`${styledCard.name} ${
            country.name.length > 20 ? styledCard.size20 : ""
          }`}
        >
          {country.name}
        </span>
        <span className={styledCard.continent}>{country.continent}</span>
      </div>
    </div>
  );
};
