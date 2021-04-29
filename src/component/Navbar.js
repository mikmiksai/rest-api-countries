import { Link } from "react-router-dom";
import { ReactComponent as MoonRegular } from "../images/moon-regular.svg";
import { ReactComponent as MoonSolid } from "../images/moon-solid.svg";

const Navbar = ({ toggleTheme, theme }) => {
  return (
    <div className="navbar">
      <div className="container navbar-wrapper">
        <Link to="/" className="logo">
          Where in the world?
        </Link>
        <button
          onClick={toggleTheme}
          className="d-flex align-items-center theme-btn"
        >
          <span className="d-flex align-items-center theme-btn">
            {theme === "light" ? <MoonRegular /> : <MoonSolid />}
          </span>{" "}
          <span>Dark Mode</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
