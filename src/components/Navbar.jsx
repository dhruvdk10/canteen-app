import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faUser,
  faShoppingCart,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";
import useStore from "../store/useStore";

function Navbar() {

  const { isLoggedIn, user, logout } = useStore();

  return (
    <nav className="navbar fixed-top px-4 d-flex justify-content-between">

      {/* Logo */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src="/edzy-logo.svg" alt="Edzy Logo" style={{ height: "40px" }} />

        <div className="ms-2 d-flex align-items-center">
          <span className="food-badge d-flex align-items-center justify-content-center me-1">
            <FontAwesomeIcon icon={faUtensils} />
          </span>
        </div>
      </Link>

      {/* Menu */}
      <div className="d-flex align-items-center gap-4">

        {/* Students */}
        <Link className="nav-link text-center" to="/students">
          <FontAwesomeIcon icon={faUserGraduate} size="lg" />
        </Link>

        {/* Cart */}
        <Link className="nav-link text-center" to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        </Link>

        {/* User Dropdown */}
        <div className="dropdown">
          <button
            className="nav-link border-0 bg-transparent dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <FontAwesomeIcon icon={faUser} size="lg" />
          </button>

          <ul className="dropdown-menu dropdown-menu-end">

            {/* If Logged In */}
            {isLoggedIn ? (
              <>
                <li>
                  <span className="dropdown-item-text fw-bold">
                    👋 {user?.name}
                  </span>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Not Logged In */}
                <li>
                  <button
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#signupModal"
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
