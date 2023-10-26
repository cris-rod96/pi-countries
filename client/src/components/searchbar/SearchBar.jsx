import styledSearch from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { searchByName, setCurrentPage } from "../../redux/countriesSlice";
export const SearchBar = (props) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(searchByName(value));
    dispatch(setCurrentPage(1));
  };
  return (
    <>
      <input
        type="text"
        name="name"
        id="name"
        className={styledSearch.inputSearch}
        onChange={handleChange}
        placeholder="Type a country name"
      />
    </>
  );
};
