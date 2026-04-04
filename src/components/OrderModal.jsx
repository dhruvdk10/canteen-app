import { useState, useEffect, useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import useStore from "../store/useStore";

function OrderModal({ show, onClose, snack, students }) {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  const { addToCart, placeOrder } = useStore();

  const [studentId, setStudentId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (modalRef.current && !bsModalRef.current) {
      bsModalRef.current = new bootstrap.Modal(modalRef.current);

      modalRef.current.addEventListener("hidden.bs.modal", () => {
        onClose();
        setQuantity(1);
        setStudentId("");
      });
    }

    if (show) bsModalRef.current?.show();
    else bsModalRef.current?.hide();
  }, [show, onClose]);

  const selectedStudent = students.find(
    (s) => s._id === studentId
  );

  const handleAddToCart = () => {
    if (!studentId) {
      alert("Please select a student before adding to cart!");
      return;
    }
    if (!snack) return;

    addToCart({
      snack,
      quantity,
      studentId, // ✅ string _id
      studentName: selectedStudent?.name, // ✅ from store
    });

    alert(
      `${quantity} ${snack.name}(s) added for ${selectedStudent?.name}! ✅`
    );

    bsModalRef.current?.hide();
  };

  const handlePlaceOrder = () => {
    if (!studentId) {
      alert("Please select a student before placing the order!");
      return;
    }

    placeOrder({
      studentId, // ✅ string _id
      snack,
      quantity,
    });

    alert(`Order placed for ${selectedStudent?.name} 🚀`);

    bsModalRef.current?.hide();
  };

  return (
    <div className="modal fade" ref={modalRef}>
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "400px", width: "90%", margin: "auto" }}
      >
        <div className="modal-content">

          {/* IMAGE */}
          <div className="text-center mb-2 position-relative">
            <img src={snack.image} alt={snack.name} className="card-img-top" />

            <div
              className="snack-type-square position-absolute"
              style={{ top: "20px", left: "20px", zIndex: 2 }}
            >
              <span
                className={`snack-type-dot ${
                  snack.type === "veg" ? "veg-dot" : "non-veg-dot"
                }`}
              ></span>
            </div>
          </div>

          {/* INFO */}
          <div className="modal-heading mx-3" style={{ fontSize: "18px" }}>
            <p>{snack.name}</p>
            <p style={{ fontWeight: "bold" }}>₹{snack.price}</p>
          </div>

          {/* SELECT + QUANTITY */}
          <div className="d-flex gap-4 mx-3 mb-3">
            <select
              className="form-select"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            <div className="d-flex align-items-center gap-1">
              <button
                className="quantity-btn minus-btn"
                onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="quantity-btn plus-btn"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="d-flex gap-3 mx-3 mb-3">
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
