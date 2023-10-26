import { useSelector } from "react-redux";
import styledActivity from "./Activity.module.css";
import { useState } from "react";
import { validates } from "./validations/validations";
import axios from "axios";
import { Alerts } from "../../components/alerts/Alerts";
import { Loader } from "../../components/loader/Loader";
export const Activity = () => {
  const [errors, setErrors] = useState({});
  const [changeForm, setChangeForm] = useState(false);
  const [nameActivity, setNameActivity] = useState(false);

  const [toast, setToast] = useState({
    type: "",
    description: "",
  });

  const countries = useSelector((state) => state.countries.allCountries);
  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesID: [],
  });
  const countriesOrder = countries.slice().sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  const getFlagByID = (id) => {
    return countries.find((country) => country.id === id).flag;
  };

  const handleInput = (e) => {
    setChangeForm(true);
    const { name, value } = e.target;
    setActivity({
      ...activity,
      [name]: value,
    });

    setErrors(
      validates({
        ...activity,
        [name]: value,
      })
    );
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;

    if (!activity.countriesID.includes(value)) {
      setActivity({
        ...activity,
        [name]: [...activity.countriesID, value],
      });

      setErrors(
        validates({
          ...activity,
          countriesID: [...activity.countriesID, value],
        })
      );
    }
  };

  const handleClickRemove = (id) => {
    setActivity({
      ...activity,
      countriesID: activity.countriesID.filter((country) => country !== id),
    });
    setErrors(
      validates({
        ...activity,
        countriesID: activity.countriesID.filter((country) => country !== id),
      })
    );
  };
  const handleActivity = (e) => {
    const { value } = e.target;
    if (value === "Otro") {
      setNameActivity(true);
    } else {
      setActivity({
        ...activity,
        name: value,
      });
      setErrors(
        validates({
          ...activity,
          name: value,
        })
      );
    }
  };
  const handleActivityClick = (e) => {
    e.preventDefault();
    setNameActivity(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const { data, status } = await axios.post(
          "http://localhost:3001/activities",
          {
            ...activity,
            countries: activity.countriesID,
          }
        );
        if (status === 200) {
          setChangeForm(false);
          setActivity({
            name: "",
            difficulty: 0,
            duration: 0,
            season: "",
            countriesID: [],
          });
          setErrors({});
          setToast({
            type: "success",
            description: "Actividad creada con exito",
          });
        }
      } catch (error) {}
    } else {
      setToast({
        type: "error",
        description: "Faltan campos por completar",
      });
    }
  };

  return (
    <div className={styledActivity.containerActivity}>
      <Loader />
      <div className={styledActivity.formActivity}>
        <form className={styledActivity.form} onSubmit={handleSubmit}>
          <div className={styledActivity.formGroup}>
            <label htmlFor="" className={styledActivity.formLabel}>
              Name
            </label>
            {nameActivity ? (
              <div className={styledActivity.groupDouble}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={activity.name}
                  className={styledActivity.formInput}
                  onChange={handleInput}
                  placeholder="Type or select an activity"
                />
                <button
                  className={styledActivity.btnShow}
                  onClick={handleActivityClick}
                >
                  Actividades
                </button>
              </div>
            ) : (
              <select
                name="name"
                id="season"
                className={styledActivity.formSelect}
                onChange={handleActivity}
              >
                <option disabled selected>
                  -- Choose an activity --
                </option>
                <option value="Caminata">Caminata</option>
                <option value="Ciclismo">Paseo en bicicleta</option>
                <option value="Climbing">Climbing</option>
                <option value="Puenting">Puenting</option>
                <option value="Camping">Camping</option>
                <option value="Otro">Otro</option>
              </select>
            )}
          </div>

          <div className={styledActivity.formGroup}>
            <label htmlFor="" className={styledActivity.formLabel}>
              Duration
            </label>
            <input
              type="number"
              className={styledActivity.formInput}
              name="duration"
              id="duration"
              min={1}
              onChange={handleInput}
              placeholder="Duration in hours"
              value={activity.duration}
            />
          </div>

          <div className={styledActivity.formGroup}>
            <label htmlFor="" className={styledActivity.formLabel}>
              Difficulty
            </label>
            <input
              type="range"
              name="difficulty"
              className={styledActivity.formInput}
              min={1}
              max={5}
              value={activity.difficulty}
              onChange={handleInput}
            />
          </div>

          <div className={styledActivity.formGroup}>
            <label htmlFor="" className={styledActivity.formLabel}>
              Season
            </label>
            <select
              name="season"
              id="season"
              className={styledActivity.formSelect}
              onChange={handleInput}
            >
              <option disabled selected>
                -- Choose a season --
              </option>
              <option value="Invierno">Invierno</option>
              <option value="Primavera">Primavera</option>
              <option value="Otoño">Otoño</option>
              <option value="Verano">Verano</option>
            </select>
          </div>

          <div className={styledActivity.formGroup}>
            <label htmlFor="" className={styledActivity.formLabel}>
              Países
            </label>
            <select
              name="countriesID"
              id="countriesID"
              className={styledActivity.formSelect}
              onChange={handleSelect}
            >
              <option disabled selected>
                -- Choose a country --
              </option>
              {countriesOrder.map((country) => (
                <option value={country.id} key={country.id}>
                  {activity.countriesID.includes(country.id) ? "\u2713" : ""}{" "}
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styledActivity.formGroup}>
            <button className={styledActivity.btnCreate} type="submit">
              Create Activity
            </button>
          </div>
        </form>
      </div>
      <div className={styledActivity.verifications}>
        <div className={styledActivity.validations}>
          {Object.keys(errors).length > 0 &&
            Object.keys(errors).map((key, index) => (
              <div className={styledActivity.error} key={index}>
                <span>{errors[key]}</span>
              </div>
            ))}
          {Object.keys(errors).length === 0 && changeForm && (
            <div className={styledActivity.message}>
              <span> Información de actividad agregada correctamente</span>
            </div>
          )}
          {Object.keys(errors).length === 0 && !changeForm && (
            <div className={styledActivity.message}>
              <div className={styledActivity.loader}></div>
              <span>Waiting</span>
            </div>
          )}
        </div>
        <div className={styledActivity.cardActivities}>
          {activity.countriesID.length > 0 ? (
            <>
              <h3>Países seleccionados</h3>
              <div className={styledActivity.badges}>
                {activity.countriesID.map((id) => (
                  <div className={styledActivity.badge} key={id}>
                    <img src={getFlagByID(id)} alt="" />
                    <span
                      onClick={() => {
                        handleClickRemove(id);
                      }}
                    >
                      X
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div
              className={`${styledActivity.message} ${styledActivity.wh100}`}
            >
              <div className={styledActivity.loader}></div>
              <span>Waiting</span>
            </div>
          )}
        </div>
      </div>
      {toast.type && <Alerts toast={toast} />}
    </div>
  );
};
