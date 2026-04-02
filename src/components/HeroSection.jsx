import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faList } from "@fortawesome/free-solid-svg-icons";
import api from "../services/Api";


function HeroSection() {
  const [banners, setBanners] = React.useState([]);

  React.useEffect(() => {
    api.get("/banners")
      .then((res) => setBanners(res.data))
      .catch((err) => console.error("Error fetching banners:", err));
  }, []);
  return (
    <section className="img_display mb-5">
      <div
        id="mybannerCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="banner-wrapper position-relative">
                <img
                  src={banner.img}
                  className="d-block w-100 img"
                  alt={banner.alt}
                  style={{ objectPosition: banner.position }}
                />

                {/* Update text */}
                <div className="banner-update">{banner.update}</div>

                {/* Buttons */}
                <div className="carousel-caption text-light d-flex gap-2">
                  <div className="order-now">
                    <button>
                      <FontAwesomeIcon icon={faUtensils} className="me-1" />
                      Order Now
                    </button>
                  </div>

                  <div className="view-menu">
                    <button>
                      <FontAwesomeIcon icon={faList} className="me-1" />
                      Menu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#mybannerCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#mybannerCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
