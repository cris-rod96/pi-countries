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
import { Loader } from "./components/loader/Loader";
import { useState } from "react";
function App() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getAllCountries() {
      const { data: countries } = await axios(
        "http://localhost:3001/countries"
      );
      dispatch(getCountries(countries));

      const { data: activities } = await axios(
        "http://localhost:3001/activities"
      );

      dispatch(getActivities(activities));
    }
    getAllCountries();
  }, []);

  return (
    <>
      {pathname != "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activities" element={<Activity />} />
        <Route path="/detail/:idCountry" element={<Detail />} />
        <Route path="*" element={<Error404 />} />
        {/* <Route path="*" element={<Loader />} /> */}
      </Routes>
    </>
  );
}

export default App;
