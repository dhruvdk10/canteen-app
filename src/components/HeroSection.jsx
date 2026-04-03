import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faList } from "@fortawesome/free-solid-svg-icons";
import { banners as bannerData } from "../data/Data";

function HeroSection() {
  const [banners, setBanners] = useState([]);

  // ✅ Load local data instead of API
  useEffect(() => {
    setBanners(bannerData);
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
              key={banner.id}
              className={`carousel-item ${
                index === 0 ? "active" : ""
              }`}
            >
              <div className="banner-wrapper position-relative">
                <img
                  src={banner.img}
                  className="d-block w-100 img"
                  alt={banner.alt}
                  style={{
                    objectPosition: banner.position,
                  }}
                />

                {/* Update text */}
                <div className="banner-update">
                  {banner.update}
                </div>

                {/* Buttons */}
                <div className="carousel-caption text-light d-flex gap-2">
                  <div className="order-now">
                    <button>
                      <FontAwesomeIcon
                        icon={faUtensils}
                        className="me-1"
                      />
                      Order Now
                    </button>
                  </div>

                  <div className="view-menu">
                    <button>
                      <FontAwesomeIcon
                        icon={faList}
                        className="me-1"
                      />
                      Menu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#mybannerCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#mybannerCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
