import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash">
      <NavLink to="/" className="splash-logo-link">
        <img
          src="/canteen-app/edzy-logo.svg"
          alt="Edzy Logo"
          className="splash-logo-img"
        />
        <div className="ms-2 d-flex align-items-center">
          <span className="food-badge splash-badge d-flex align-items-center justify-content-center me-1">
            <FontAwesomeIcon icon={faUtensils} />
          </span>
        </div>
      </NavLink>
    </div>
  );
};

export default SplashScreen;
