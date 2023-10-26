import { Cards } from "../../components/cards/Cards";
import styledHome from "./Home.module.css";
import { Filters } from "../../components/filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByContinent,
  orderCountries,
  setCurrentPage,
  filterByActivities,
} from "../../redux/countriesSlice";
import { Pagination } from "../../components/pagination/Pagination";
import { Loader } from "../../components/loader/Loader";

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
