import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { countryNameUrl, allCountriesURL } from "../http-api";
import arrowLeftLight from "../images/arrow-left-light.svg";
import arrowLeftDarK from "../images/arrow-left-dark.svg";
import Loading from "../component/Loading";

const Country = ({ match, theme }) => {
  const selectedCountryId = match.params.id.replace(/_/g, " ");
  const [country, setCountry] = useState([]);
  const [countries, setCountries] = useState([]);
  const [borderNames, setBorderNames] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [borders, setBorders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    let source = axios.CancelToken.source();
    let mounted = true;
    const getSelectedCountry = async () => {
      const reqAll = await axios
        .get(allCountriesURL(), {
          cancelToken: source.token,
        })
        .catch(() => {
          if (mounted) {
            if (axios.isCancel()) {
              console.log(`request cancelled`);
            } else {
              console.log("another error happened:");
            }
          }
        });
      const reqSpecificCountry = await axios.get(
        countryNameUrl(selectedCountryId),
        { cancelToken: source.token }
      );

      await axios.all([reqAll, reqSpecificCountry]).then(
        axios.spread((...res) => {
          if (mounted) {
            // reqAll
            setCountries(res[0].data);
            //reqSpecificCountry
            setCountry(res[1].data[0]);
            setCurrencies(res[1].data[0].currencies);
            setLanguages(res[1].data[0].languages);
            setBorders(res[1].data[0].borders);
          }
        })
      );
      setIsLoading(false);
    };

    getSelectedCountry();

    return () => {
      mounted = false;
      source.cancel("Cancelling in cleanup");
    };
  }, [selectedCountryId]);

  useEffect(() => {
    const handleBorder = () => {
      let getBorder = borders.map((border) => {
        let borderName = countries.filter((country) => {
          return border === country.alpha3Code;
        });
        return borderName[0].name;
      });
      setBorderNames(getBorder);
    };
    handleBorder();
  }, [borders, countries]);

  return (
    <div className="country-selected">
      <div className="row">
        <Link to="/" className="button back-btn d-flex align-items-center">
          <img
            src={theme === "light" ? arrowLeftDarK : arrowLeftLight}
            alt="arrow-left"
            className="no-shadow"
            style={{ height: "1rem", width: "1rem", marginRight: "0.8rem"}}
          />
          Back
        </Link>
      </div>
      {isLoading ? (
        <div className="loading">
          <Loading />
        </div>
      ) : (
        <div className="row">
          <div className="col-6 pl-0 pr-0">
            <img
              src={country.flag}
              alt={`${country.name}-flag`}
              className="w-100"
            />
          </div>
          <div className="col-6">
            <p className="title">{country.name}</p>
            <div className="body">
              <div>
                <p>
                  <span>Native Name:</span> {country.nativeName}
                </p>
                <p>
                  <span>Population:</span> {country.population}
                </p>
                <p>
                  <span>Region:</span> {country.region}
                </p>
                <p>
                  <span>Sub Region:</span> {country.subregion}
                </p>
                <p>
                  <span>Capital:</span> {country.capital}
                </p>
              </div>
              <div>
                <p>
                  <span>Top Level Domain:</span> {country.topLevelDomain}
                </p>
                <p>
                  <span>Currencies:</span>{" "}
                  {currencies.map((currency, index) => {
                    return index === currencies.length - 1
                      ? `${currency.name}`
                      : `${currency.name}, `;
                  })}
                </p>
                <p>
                  <span>Languages:</span>{" "}
                  {languages.map((language, index) => {
                    return index === languages.length - 1
                      ? `${language.name}`
                      : `${language.name}, `;
                  })}
                </p>
              </div>
            </div>
            <div className="borders">
              <span>Borders Countries:</span>{" "}
              <div>
                {borderNames.length === 0 ? (
                  <p>None</p>
                ) : (
                  borderNames.map((border) => (
                    <Link
                      to={`/country/${border}`}
                      key={border}
                      className="button border"
                    >{`${border}`}</Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Country;
