import { NavLink, useNavigate, useParams } from "react-router-dom";
import styledDetail from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/loader/Loader";
import { Country } from "../../components/country/Country";
import axios from "axios";
import { getActivities } from "../../redux/countriesSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";

export const Detail = () => {
  const [showLoading, setShowLoading] = useState(false);

  const dispatch = useDispatch();
  // Obtenemos el id del pais de la ruta
  const { idCountry } = useParams();
  // Obtenemos todos los paises de nuestro store
  const countries = useSelector((state) => state.countries.allCountries);
  // Filtramos el pais que coincida con el id de la ruta
  const country = countries.find(
    (currentCountry) => currentCountry.id === idCountry
  );

  // Con useNavigate podemos navegar a otras rutas
  const navigate = useNavigate();

  if (!country) return;
  const countryActivities = country.Activities;

  // Handler para eliminar una actividad
  const deleteActivity = async (id) => {
    try {
      // Hacemos una peticion delete a nuestro servidor
      const { data, status } = await axios.delete(`${BASE_URL}/activities/`, {
        data: { id },
      });

      if (status === 200) {
        // Si la peticion fue exitosa, actualizamos el estado de nuestro store
        const newActivities = countryActivities.filter(
          (activity) => activity.id !== id
        );
        // Enviamos la accion a nuestro stores
        dispatch(getActivities(newActivities));
        // Navegamos a la ruta /home
        navigate("/home");
      }
    } catch (error) {
      // Si la peticion falla, mostramos el error
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    setShowLoading(true);

    setTimeout(() => {
      setShowLoading(false);
    }, 3000);
  }, []);

  return showLoading ? (
    <Loader />
  ) : (
    <>
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
                id={activity.id}
                name={activity.name}
                difficulty={activity.difficulty}
                duration={activity.duration}
                season={activity.season}
                deleteActivity={deleteActivity}
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
    </>
  );
};
