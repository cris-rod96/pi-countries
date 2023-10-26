import { createSlice } from "@reduxjs/toolkit";

// Estado inicial
const initialState = {
  allCountries: [],
  activities: [],
  filteredCountries: [],
  countriesPerPage: 10,
  currentPage: 1,
};

// Reducer
export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    // Guardo en el estado los paises que me llegan de la API/BD
    getCountries: (state, action) => {
      state.allCountries = action.payload;
      state.filteredCountries = action.payload;
    },

    // Guardo en el estado las actividades que me llegan de la API/BD
    getActivities: (state, action) => {
      state.activities = action.payload;
    },

    // Borro una actividad del estado
    deleteActivity: (state, action) => {
      const id = action.payload;
      state.activities = state.activities.filter(
        (activity) => activity.id !== id
      );
    },

    // Filtro los paises por actividades
    filterByActivities: (state, action) => {
      const filtro = action.payload;
      switch (filtro) {
        case "no_filtro": {
          state.filteredCountries = state.allCountries;
          break;
        }
        case "con_activities": {
          state.filteredCountries = state.allCountries.filter(
            (country) => country.Activities.length > 0
          );
          break;
        }
        case "sin_activities": {
          state.filteredCountries = state.allCountries.filter(
            (country) => country.Activities.length === 0
          );
          break;
        }
      }
    },

    // Filtro los paises por continente
    filterByContinent: (state, action) => {
      // Posible paso a minusculas
      if (action.payload === "All") {
        state.filteredCountries = state.allCountries;
        return;
      }
      state.filteredCountries = state.allCountries.filter(
        (country) => country.continent === action.payload
      );
    },

    // Ordeno los paises
    orderCountries: (state, action) => {
      const filter = action.payload;
      switch (filter) {
        case "name_asc":
          state.filteredCountries = state.filteredCountries.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
          break;

        case "name_desc":
          state.filteredCountries = state.filteredCountries.sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          });
          break;

        case "population_asc":
          state.filteredCountries = state.filteredCountries.sort((a, b) => {
            if (a.population > b.population) return 1;
            if (a.population < b.population) return -1;
            return 0;
          });
          break;
        case "population_desc":
          state.filteredCountries = state.filteredCountries.sort((a, b) => {
            if (a.population < b.population) return 1;
            if (a.population > b.population) return -1;
            return 0;
          });
          break;

        default:
          state.filteredCountries = state.allCountries;
          break;
      }
    },

    // Cambio la pagina actual
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    // Busco paises por nombre
    searchByName: (state, action) => {
      const name = action.payload.toLowerCase();
      state.filteredCountries = state.allCountries.filter((country) =>
        country.name.toLowerCase().includes(name)
      );
    },
  },
});

export const {
  getCountries,
  filterByContinent,
  orderCountries,
  searchByName,
  setCurrentPage,
  getActivities,
  filterByActivities,
} = countriesSlice.actions;
export default countriesSlice.reducer;
