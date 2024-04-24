import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/loader/Loader";
import { Alert } from "../../components/alerts/Alert";
import styledActivity from "./Activity.module.css";
import { validates } from "./validations/validations";
import { existCountry, orderCountries } from "../../utils/functions/country";
import { Country } from "../../components/country/Country";
import { getActivities } from "../../redux/countriesSlice";
import { useNavigate } from "react-router-dom";
export const Activity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLoading, setShowLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesID: "",
  });
  const [changeForm, setChangeForm] = useState(false);
  const [nameActivity, setNameActivity] = useState(false);
  const [activities, setActivities] = useState([]);
  const [alertToast, setAlertToast] = useState({
    type: "",
    description: "",
  });
  const [show, setShow] = useState(false);
  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesID: [],
  });
  const countries = useSelector((state) => state.countries.allCountries);
  const countriesOrder = orderCountries(countries);

  useEffect(() => {
    const myActivities = [];
    for (let c = 0; c < countries.length; c++) {
      for (let a = 0; a < countries[c].Activities.length; a++) {
        myActivities.push(countries[c].Activities[a]);
      }
    }
    setActivities([...myActivities]);
  }, []);
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
    if (!existCountry(activity.countriesID, value)) {
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

  const setearAlert = () => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(true);
    if (Object.values(errors).length === 0) {
      try {
        const { status } = await axios.post(
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
            difficulty: "",
            duration: "",
            season: "",
            countriesID: [],
          });
          setErrors({});
          // TOAST SUCCESS
          setAlertToast({
            type: "Success",
            description: "Actividad agregada correctamente",
          });
        }
      } catch (error) {
        const { message } = error.response.data;
        // TOAST ERROR
        setAlertToast({
          type: "Error",
          description: message,
        });
      }
    } else {
      // TOAST ERROR
      setAlertToast({
        type: "Error",
        description: "Complete los campos correctamente",
        show: true,
      });
    }

    setearAlert();
  };

  const deleteActivity = async (id) => {
    try {
      // Hacemos una peticion delete a nuestro servidor
      const { data, status } = await axios.delete(
        `http://localhost:3001/activities/`,
        {
          data: { id },
        }
      );

      if (status === 200) {
        // Si la peticion fue exitosa, actualizamos el estado de nuestro store
        const newActivities = activities.filter(
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
    <div className={styledActivity.containerActivity}>
      <div className={styledActivity.activities}>
        <h2>Actividades</h2>
        {activities.length > 0 ? (
          <div className={styledActivity.cards}>
            {activities.map((activity) => (
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
          <div className={styledActivity.empty}>
            <div className={styledActivity.contenido}>
              <p>🤷‍♂️</p>
              <h3>
                Al parecer no tienes actividades creadas para. Agrega una nueva
                y se mostrará aquí.
              </h3>
            </div>
          </div>
        )}
      </div>

      <div className={styledActivity.content}>
        <h2 className={styledActivity.title}>Create Activity</h2>
        <div className={styledActivity.boxForm}>
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
                      className={`${styledActivity.formInput} ${
                        errors.name && styledActivity.inputError
                      }}`}
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
                    className={`${styledActivity.formSelect} ${
                      errors.name && styledActivity.inputError
                    }`}
                    onChange={handleActivity}
                  >
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
                  className={`${styledActivity.formInput} ${
                    errors.duration && styledActivity.inputError
                  }`}
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
                  className={`${styledActivity.rangeInput}`}
                  min={1}
                  max={5}
                  value={activity.difficulty}
                  onChange={handleInput}
                />
                <span className={styledActivity.difficulty}>
                  {activity.difficulty ? activity.difficulty : 1}
                </span>
              </div>

              <div className={styledActivity.formGroup}>
                <label htmlFor="" className={styledActivity.formLabel}>
                  Season
                </label>
                <select
                  name="season"
                  id="season"
                  className={`${styledActivity.formSelect} ${
                    errors.season && styledActivity.inputError
                  }`}
                  onChange={handleInput}
                >
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
                  className={`${styledActivity.formSelect} ${
                    errors.countriesID && styledActivity.inputError
                  }`}
                  onChange={handleSelect}
                >
                  {countriesOrder.map((country) => (
                    <option value={country.id} key={country.id}>
                      {activity.countriesID.includes(country.id)
                        ? "\u2713"
                        : ""}{" "}
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
        </div>
      </div>
      <div className={styledActivity.alerts}>
        <Alert toast={alertToast} show={show} />
      </div>
      {/* {toast.type && <Alerts toast={toast} />} */}
    </div>
  );
};
