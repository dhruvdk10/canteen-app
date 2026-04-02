import { useEffect } from "react";
import { NavLink } from "react-router-dom";

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
      </NavLink>
    </div>
  );
};

export default SplashScreen;
