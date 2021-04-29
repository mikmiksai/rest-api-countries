const base_url = "https://restcountries.eu/rest/v2";

export const allCountriesURL = () => {
  return `${base_url}/all`;
};
export const countryNameUrl = (countryName) => {
  return `${base_url}/name/${countryName}`;
};

