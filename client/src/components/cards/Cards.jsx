import styledCards from "./Cards.module.css";
import { Card } from "../card/Card";
export const Cards = (props) => {
  const { countries } = props;
  {
    return countries.length === 0 ? (
      <div className={styledCards.notFound}>
        <img src="/world_flags.png" alt="" />
        <h1>No se encontraron paises</h1>
      </div>
    ) : (
      <div className={styledCards.cards}>
        {countries.map((country, index) => (
          <Card country={country} key={index} />
        ))}
      </div>
    );
  }
};
