import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faList } from "@fortawesome/free-solid-svg-icons";
import api from "../services/Api";
import OrderModal from "../components/OrderModal";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

function Home({ cart, setCart }) {   // ✅ RECEIVE PROPS
  const [students, setStudents] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [selectedSnack, setSelectedSnack] = useState(null);

  // Fetch snacks and students from API
  useEffect(() => {
    api.get("/snacks")
      .then((res) => setSnacks(res.data))
      .catch((err) => console.error("Error fetching snacks:", err));

    api.get("/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const openModal = (snack) => setSelectedSnack(snack);
  const closeModal = () => setSelectedSnack(null);

  // Place order via API
  const handlePlaceOrder = async (snack, studentId, quantity) => {
    if (!studentId) {
      alert("Please select a student");
      return;
    }

    const amount = snack.price * quantity;

    try {
      const studentRes = await api.get(`/students/${studentId}`);
      const student = studentRes.data;

      const newOrder = {
        id: Date.now(),
        snackName: snack.name,
        quantity,
        amount,
      };

      const updatedStudent = {
        ...student,
        totalSpent: student.totalSpent + amount,
        orders: [...student.orders, newOrder],
      };

      await api.put(`/students/${studentId}`, updatedStudent);

      setStudents((prev) =>
        prev.map((s) => (s.id === Number(studentId) ? updatedStudent : s))
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
        <h2 className="mb-4 text-center">Available Snacks</h2>

        <div className="row">
          {snacks.map((snack) => (
            <div className="col-md-4" key={snack.id}>
              <div className="card mb-4 h-100 snack-card">
                <div className="image-wrapper">
                  <img
                    src={snack.image}
                    className="card-img-top"
                    alt={snack.name}
                  />

                  <div className="rating-badge">⭐ {snack.rating}</div>

                  <div className="hover-btn">
                    <button
                      className="btn btn-dark"
                      onClick={() => openModal(snack)}
                    > <FontAwesomeIcon icon={faUtensils}/>
                    </button>
                     <button
                      className="btn btn-dark"
                      onClick={() => openModal(snack)}
                    > <FontAwesomeIcon icon={faList} className="me-1" />
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <h5>{snack.name}</h5>
                  <p>₹{snack.price}</p>
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
