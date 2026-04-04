import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faList } from "@fortawesome/free-solid-svg-icons";
import OrderModal from "../components/OrderModal";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import api from "../services/Api";

function Home({ cart, setCart }) {
  const [students, setStudents] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [selectedSnack, setSelectedSnack] = useState(null);

  // FETCH FROM BACKEND
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentRes = await api.get("/students");
        const snackRes = await api.get("/snacks");

        setStudents(studentRes.data);
        setSnacks(snackRes.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const openModal = (snack) => setSelectedSnack(snack);
  const closeModal = () => setSelectedSnack(null);

  const handlePlaceOrder = async (snack, studentId, quantity) => {
    if (!studentId) {
      alert("Please select a student");
      return;
    }

    const amount = snack.price * quantity;

    try {
      const student = students.find(
        (s) => s._id === studentId
      );

      const newOrder = {
        id: Date.now(),
        snackName: snack.name,
        quantity,
        amount,
      };

      const updatedStudent = {
        ...student,
        totalSpent: (student.totalSpent || 0) + amount,
        orders: [...(student.orders || []), newOrder],
      };

      setStudents((prev) =>
        prev.map((s) =>
          s._id === studentId ? updatedStudent : s
        )
      );

      alert("Order placed successfully!");
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div>
      <div className="banner-container">
        <HeroSection />
      </div>

      <div className="container mt-4">
        <div className="row">
          {snacks.map((snack) => (
            <div className="col-md-4" key={snack._id}>
              <div className="card mb-4 h-100 snack-card">
                <div className="image-wrapper position-relative">
                  <img
                    src={snack.image}
                    className="card-img-top"
                    alt={snack.name}
                  />

                  <div className="rating-badge">
                    ⭐ {snack.rating}
                  </div>

                  <div className="hover-btn">
                    <button
                      className="btn btn-dark me-1"
                      onClick={() => openModal(snack)}
                    >
                      <FontAwesomeIcon icon={faUtensils} />
                    </button>
                    <button
                      className="btn btn-dark"
                      onClick={() => openModal(snack)}
                    >
                      <FontAwesomeIcon icon={faList} className="me-1" />
                    </button>
                  </div>
                </div>

                <div className="card-body" style={{ fontSize: "18px" }}>
                  <p>{snack.name}</p>

                  <div
                    className="snack-type-square position-absolute"
                    style={{ top: "10px", left: "10px", zIndex: 2 }}
                  >
                    <span
                      className={`snack-type-dot ${
                        snack.type === "veg"
                          ? "veg-dot"
                          : "non-veg-dot"
                      }`}
                    ></span>
                  </div>

                  <p style={{ fontWeight: "bold" }}>
                    ₹{snack.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedSnack && (
          <OrderModal
            show={!!selectedSnack}
            snack={selectedSnack}
            students={students}
            onClose={closeModal}
            onPlaceOrder={handlePlaceOrder}
            setCart={setCart}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
