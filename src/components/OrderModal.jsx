import { useState, useEffect, useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import api from "../services/Api";

function OrderModal({ show, onClose, snack, students, setCart }) {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  const [studentId, setStudentId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (modalRef.current && !bsModalRef.current) {
      bsModalRef.current = new bootstrap.Modal(modalRef.current, {
        backdrop: true,
        keyboard: true,
      });

      modalRef.current.addEventListener("hidden.bs.modal", () => {
        onClose();
        setQuantity(1);
        setStudentId("");
      });
    }

    if (show) {
      bsModalRef.current.show();
    } else if (bsModalRef.current) {
      bsModalRef.current.hide();
    }
  }, [show, onClose]);

  // Add to Cart
  const handleAddToCart = () => {
    if (!snack) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.snack.id === snack.id);
      if (existing) {
        return prev.map((item) =>
          item.snack.id === snack.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { snack, quantity }];
    });

    alert(`${quantity} ${snack.name}(s) added to cart!`);
    if (bsModalRef.current) bsModalRef.current.hide();
  };

  // Place Order
  const handlePlaceOrder = async () => {
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

      alert("Order placed successfully!");
      if (bsModalRef.current) bsModalRef.current.hide();
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div
      className="modal fade"
      ref={modalRef}
      id="orderModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* Snack Image */}
          <div className="text-center mb-3">
            <img src={snack.image} alt={snack.name} className="card-img-top" />
            <div
              className="snack-type-square position-absolute"
              style={{ top: "20px", left: "20px", zIndex: 2 }}
            >
              <span
                className={`snack-type-dot ${snack.type === "veg" ? "veg-dot" : "non-veg-dot"
                  }`}
              ></span>
            </div>
          </div>

          <h5 className="mb-3 mx-3">{snack.name}</h5>

          {/* Student select & quantity */}
          <div className="d-flex align-items-center justify-content-between mb-3 mx-3 gap-3">

            {/* Student */}
            <select
              className="form-select"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            {/* Quantity */}
            <div className="d-flex align-items-center gap-2 quantity-box">
              <button
                className="btn-outline-secondary text-danger btn-sm btn"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="btn-outline-secondary text-success btn-sm btn"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

          </div>

          {/* Buttons */}
          <div className="d-flex gap-2 mx-3 mb-3">
            <button className="btn btn-warning w-50" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-success w-50" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
