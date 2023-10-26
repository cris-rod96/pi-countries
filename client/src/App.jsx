import { Route, Routes, useLocation } from "react-router-dom";
import { Landing } from "./pages/landing/Landing";
import { Home } from "./pages/home/Home";
import { Detail } from "./pages/detail/Detail";
import { Navbar } from "./components/navbar/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getActivities, getCountries } from "./redux/countriesSlice";
import { Activity } from "./pages/activity/Activity";
import { Error404 } from "./pages/404/Error404";
function App() {
  // Con useLocation obtengo la ruta actual
  const { pathname } = useLocation();

  // Con dispatch puedo enviar acciones a mi store
  const dispatch = useDispatch();

  // Con useEffect hago peticiones a mi servidor para obtener los paises y las actividades
  useEffect(() => {
    async function getAllCountries() {
      try {
        const { data: countries } = await axios(
          "http://localhost:3001/countries"
        );
        // Envio la accion a mi store
        dispatch(getCountries(countries));
      } catch (err) {
        dispatch(getCountries([]));
      }

      try {
        const { data: activities } = await axios(
          "http://localhost:3001/activities"
        );
        dispatch(getActivities(activities));
      } catch (error) {
        dispatch(getActivities([]));
      }
    }
    getAllCountries();
  }, []);

  // Si la ruta actual es distinta a "/" muestro el navbar
  // Con Routes puedo definir las rutas de mi aplicacion
  return (
    <>
      {pathname != "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activities" element={<Activity />} />
        <Route path="/detail/:idCountry" element={<Detail />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
