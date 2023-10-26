export const orderCountries = (countries) => {
  return countries.slice().sort((a, b) => {
    if (a.name > b.name) return 1;
    else if (a.name < b.name) return -1;
    else return 0;
  });
};

export const existCountry = (countries, id) => {
  return countries.find((country) => country.id === id);
};
