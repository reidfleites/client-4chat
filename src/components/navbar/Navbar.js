import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const [currentUser] = useContext(AppContext);

  return (
    <div className="navbar">
      {currentUser.username === "" && (
        <ul>
          <li>
            <NavLink to="/" className="inActive" activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="signup" className="inActive" activeClassName="active">
              Signup
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}
export default Navbar;
