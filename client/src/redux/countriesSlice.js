import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCountries: [],
  activities: [],
  filteredCountries: [],
  countriesPerPage: 10,
  currentPage: 1,
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    getCountries: (state, action) => {
      state.allCountries = action.payload;
      state.filteredCountries = action.payload;
    },

    getActivities: (state, action) => {
      state.activities = action.payload;
    },

    deleteActivity: (state, action) => {
      const id = action.payload;
      state.activities = state.activities.filter(
        (activity) => activity.id !== id
      );
    },

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

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

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
