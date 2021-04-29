// import { allCountriesURL } from "./http-api";
import "./scss/app.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";

// Components
import Navbar from "./component/Navbar";

// Pages
import Home from "./pages/Home";
import Country from "./pages/Country";
function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("themeMode", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("themeMode", "light");
    }
  };

  useEffect(() => {
    let themeMode = localStorage.getItem("themeMode");
    themeMode === "light" ? setTheme("light") : setTheme("dark");
  }, [theme]);

  return (
    <div className={`wrapper ${theme === "light" ? "" : "darkmode"}`}>
      <Router>
        <Navbar toggleTheme={toggleTheme} theme={theme} />

        <div className="container">
          <Switch>
            <Route exact path={["/", "/home"]}>
              <Home
              // countries={countries}
              // filteredCountry={filteredCountry}
              // isLoading={isLoading}
              // setFilteredCountry={setFilteredCountry}
              // getAllCountries={getAllCountries}
              />
            </Route>
            <Route
              exact
              path="/country/:id"
              component={(props) => <Country {...props} theme={theme}/>}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
