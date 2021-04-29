import { allCountriesURL } from "../http-api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Component
import CountryItem from "../component/CountryItem";
import Filters from "../component/Filters";
import Loading from "../component/Loading";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchCountry, setSearchCountry] = useState("");
  const [haveFilteredItems, setHaveFilteredItems] = useState(true);
  const [filterRegion, setFilterRegion] = useState("All");


  const searchFilter = (e) => {
    e.preventDefault();
    setSearchCountry(e.target.value);
  };
  const optionFilter = (e) => {
    e.preventDefault();
    setFilterRegion(e.target.value);
  };

  useEffect(() => {
    const delay = function (n) {
      n = n || 2000;
      return new Promise((done) => {
        setTimeout(() => {
          done();
        }, n);
      });
    };
    const getAllCountries = async () => {
      await axios.get(allCountriesURL()).then((res) => {
        setFilteredCountry(res.data);
        return setCountries(res.data);
      });
      await delay(1000);
      setIsLoading(false);
    };
    getAllCountries();
  }, []);


  useEffect(() => {
    const handleFilters = () => {
      const searchFilterCountries = [...countries];
      let filteredCountries;

      if (filterRegion === "All") {
        filteredCountries = searchFilterCountries.filter((country) => {
          return country.name
            .toLowerCase()
            .startsWith(searchCountry.toLowerCase());
        });
      } else {
        filteredCountries = searchFilterCountries.filter((country) => {
          return (
            country.name
              .toLowerCase()
              .startsWith(searchCountry.toLowerCase()) &&
            country.region === filterRegion
          );
        });
      }
      setFilteredCountry(filteredCountries);

      filteredCountries.length === 0
        ? setHaveFilteredItems(false)
        : setHaveFilteredItems(true);
    };

    handleFilters();
  }, [searchCountry, filterRegion, countries]);

  return (
    <div>
      <Filters searchFilter={searchFilter} optionFilter={optionFilter} />
      <div className={`${isLoading ? "loading" : "country-list"}`}>
        {searchCountry.length !== 0 && haveFilteredItems === false ? (
          <p>No result found</p>
        ) : isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          filteredCountry.map((country) => (
            <Link
              to={`/country/${country.name.toLowerCase().replace(/ /g, "_")}`}
              key={country.alpha3Code}
            >
              <CountryItem data={country} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
