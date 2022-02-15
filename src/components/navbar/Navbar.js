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
            <NavLink
              to="/"
              className="link"
              style={({ isActive }) =>
                isActive ? { color: "#b91646" } : { color: "#b9164680" }
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="signup"
              className="link"
              style={({ isActive }) =>
                isActive ? { color: "#b91646" } : { color: "#b9164680" }
              }
            >
              Signup
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}
export default Navbar;
