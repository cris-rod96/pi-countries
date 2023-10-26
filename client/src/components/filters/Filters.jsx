import { useDispatch } from "react-redux";
import styledFilters from "./Filters.module.css";
import { setCurrentPage } from "../../redux/countriesSlice";
export const Filters = (props) => {
  const { filterContinent, orderCountries, filterActivities } = props;
  const dispatch = useDispatch();
  const handleChangeContinent = (e) => {
    const { value } = e.target;
    filterContinent(value);
    dispatch(setCurrentPage(1));
  };

  const handleOrderCountries = (e) => {
    const { value } = e.target;
    orderCountries(value);
    dispatch(setCurrentPage(1));
  };
  const handleFilterActivity = (e) => {
    const { value } = e.target;
    filterActivities(value);
  };

  return (
    <div className={styledFilters.containerFilters}>
      <div className={styledFilters.filter}>
        <select
          name="selectContinent"
          id="selectContinent"
          className={styledFilters.filterSelect}
          onChange={handleChangeContinent}
        >
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctida</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
        </select>
      </div>
      <div className={styledFilters.filter}>
        <select
          name="selectActivity"
          id="selectActivty"
          className={styledFilters.filterSelect}
          onChange={handleFilterActivity}
        >
          <option value="no_filtro">No filtrar</option>
          <option value="con_activities">Países con actividades</option>
          <option value="sin_activities">Países sin actividades</option>
        </select>
      </div>
      <div className={styledFilters.filter}>
        <select
          name="selectOrder"
          id="selectOrder"
          className={styledFilters.filterSelect}
          onChange={handleOrderCountries}
        >
          <option value="null">No filter</option>
          <optgroup label="Nombre">
            <option value="name_asc">Ascendente</option>
            <option value="name_desc">Descendente</option>
          </optgroup>
          <optgroup label="Población">
            <option value="population_asc">Ascendente</option>
            <option value="population_desc">Descendente</option>
          </optgroup>
        </select>
      </div>
    </div>
  );
};
