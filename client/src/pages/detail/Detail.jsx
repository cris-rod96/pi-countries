import { NavLink, useParams } from "react-router-dom";
import styledDetail from "./Detail.module.css";
import { useSelector } from "react-redux";
import { Loader } from "../../components/loader/Loader";
import { Country } from "../../components/county/Country";
import { useEffect, useState } from "react";

export const Detail = () => {
  const { idCountry } = useParams();
  const countries = useSelector((state) => state.countries.allCountries);
  const country = countries.find(
    (currentCountry) => currentCountry.id === idCountry
  );

  if (!country) return;
  const countryActivities = country.Activities;

  // const activity = activities.find((ac) => ac.id === idCountry);

  return (
    <div>
      <Loader />
      <div className={styledDetail.containerDetail}>
        <div className={styledDetail.cardDetail}>
          <img src={country?.flag} alt="" />
          <div
            className={`${styledDetail.boxDetail} ${styledDetail.nameContinent}`}
          >
            <div className={styledDetail.group}>
              <p className={styledDetail.detail}>Nombre</p>
              <p className={styledDetail.value}>{country?.name}</p>
            </div>
            <div className={styledDetail.group}>
              <p className={styledDetail.detail}>Capital</p>
              <p className={styledDetail.value}>{country?.capital}</p>
            </div>
          </div>
          <div
            className={`${styledDetail.boxDetail}   ${styledDetail.officialName}`}
          >
            <div className={styledDetail.group}>
              <p className={styledDetail.detail}>Nombre Oficial</p>
              <p className={styledDetail.value}> {country?.official_name}</p>
            </div>
          </div>
          <div
            className={`${styledDetail.boxDetail} ${styledDetail.populationArea}`}
          >
            <div className={styledDetail.group}>
              <p className={styledDetail.detail}>Población</p>
              <p className={styledDetail.value}>{country?.population} hbts</p>
            </div>
            <div className={styledDetail.group}>
              <p className={styledDetail.detail}>Area</p>
              <p className={styledDetail.value}>{country?.area} km2</p>
            </div>
          </div>
          <div
            className={`${styledDetail.boxDetail} ${styledDetail.subContinent}`}
          >
            <div className={styledDetail.group}>
              <p className={styledDetail.detail}>Subregion</p>
              <p className={styledDetail.value}>{country?.subregion}</p>
            </div>
            <div className={styledDetail.group}>
              <p className={styledDetail.detail}>Continente</p>
              <p className={styledDetail.value}>{country?.continent}</p>
            </div>
          </div>
          <div className={styledDetail.hoverMe}>
            <h3>Hover Me</h3>
          </div>
        </div>
      </div>
      <div className={styledDetail.cardActivities}>
        <h3>Actividades relacionadas</h3>

        {countryActivities.length > 0 ? (
          <div className={styledDetail.cards}>
            {countryActivities.map((activity) => (
              <Country
                key={activity.id}
                name={activity.name}
                difficulty={activity.difficulty}
                duration={activity.duration}
                season={activity.season}
              />
            ))}
          </div>
        ) : (
          <div className={styledDetail.empty}>
            <div className={styledDetail.content}>
              <p>🤷‍♂️</p>
              <h3>
                Al parecer no tienes actividades creadas para {country.name}.
                Para agregar una actividad, ve a la sección de actividades y
                crea una nueva.
              </h3>
              <NavLink to={"/activities"}>
                <button className={styledDetail.btnGo}>Ir a actividades</button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
