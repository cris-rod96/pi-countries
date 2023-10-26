import { Cards } from "../../components/cards/Cards";
import { Filters } from "../../components/filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../../components/pagination/Pagination";
import { Loader } from "../../components/loader/Loader";
import axios from "axios";
import {
  filterByContinent,
  orderCountries,
  setCurrentPage,
  filterByActivities,
  getCountries,
} from "../../redux/countriesSlice";
import styledHome from "./Home.module.css";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  const countriesState = useSelector((state) => state.countries);
  const {
    filteredCountries: countries,
    countriesPerPage,
    currentPage,
  } = countriesState;

  const handlerFilteredByContinent = (value) => {
    dispatch(filterByContinent(value));
  };

  const handlerOrderCountries = (key) => {
    dispatch(orderCountries(key));
  };

  const handlePage = (page) => {
    dispatch(setCurrentPage(page));
  };
  const filterActivities = (value) => {
    dispatch(filterByActivities(value));
  };

  const totalPages = Math.ceil(countries.length / countriesPerPage);
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const countriesSlice = countries.slice(startIndex, endIndex);

  useEffect(() => {
    async function fetchCountries() {
      const { data } = await axios("http://localhost:3001/countries");
      dispatch(getCountries(data));
    }
    fetchCountries();
  }, []);

  return (
    <>
      <div className={styledHome.containerHome}>
        <Loader />
        <Filters
          filterContinent={handlerFilteredByContinent}
          orderCountries={handlerOrderCountries}
          filterActivities={filterActivities}
        />

        <Pagination totalPages={totalPages} handlePage={handlePage} />
        <Cards countries={countriesSlice} />
      </div>
    </>
  );
};
