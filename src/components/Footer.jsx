import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="pt-4 pb-3">
      <div className="container">

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">

          {/* Logo & Badge */}
          <div className="d-flex align-items-center mb-3 mb-md-0">
            <img src="/edzy-logo.svg" alt="Edzy Logo" style={{ height: "40px" }} />
            <span className="food-badge d-flex align-items-center justify-content-center ms-2">
              <FontAwesomeIcon icon={faUtensils} />
            </span>
          </div>

          {/* App Download */}
          <div className="d-flex gap-2 mb-3 mb-md-0">
            <a href="https://play.google.com/store" target="_blank" rel="noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Play Store"
                style={{ height: "50px" }}
              />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                style={{ height: "50px" }}
              />
            </a>
          </div>

          {/* Social Links */}
          <div className="d-flex gap-3 fs-4">
            <a href="https://www.facebook.com/GetEdzy" target="_blank" rel="noreferrer" >
              <i className="bi bi-facebook text-primary"></i>
            </a>
            <a href="https://x.com/GetEdzy" target="_blank" rel="noreferrer">
              <i className="bi bi-twitter text-info"></i>
            </a>
            <a href="https://www.youtube.com/@GetEdzy" target="_blank" rel="noreferrer">
              <i className="bi bi-youtube text-danger"></i>
            </a>
            <a href="https://www.linkedin.com/company/get-edzy/" target="_blank" rel="noreferrer">
              <i className="bi bi-linkedin text-primary"></i>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=919625668472&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer">
              <i className="bi bi-whatsapp text-success"></i>
            </a>
            <a href="https://www.instagram.com/getedzy/" target="_blank" rel="noreferrer">
              <i className="bi bi-instagram text-danger"></i>
            </a>
          </div>

        </div>

        <hr className="bg-secondary" />

        <div className="text-center">
          <p className="mb-0">
            Made with <span style={{ color: "red" }}>❤️</span> by Edzy
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
