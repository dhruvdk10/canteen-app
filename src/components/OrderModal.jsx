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

  const handleAddToCart = () => {
    if (!studentId) {
      alert("Please select a student before adding to cart!");
      return;
    }
    if (!snack) return;

    const studentName = students.find(s => s.id === Number(studentId))?.name;

    addToCart({
      snack,
      quantity,
      studentId: Number(studentId),
      studentName, // ✅ add student name here
    });

    alert(`${quantity} ${snack.name}(s) added for ${studentName}! ✅`);
    bsModalRef.current?.hide();
  };

  const handlePlaceOrder = () => {
    if (!studentId) {
      alert("Please select a student before placing the order!");
      return;
    }

    placeOrder({
      studentId: Number(studentId),
      snack,
      quantity,
    });

    alert("Order placed successfully 🚀");
    bsModalRef.current?.hide();
  };

  return (
    <div className="modal fade" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="text-center mb-3">
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

          <h5 className="mx-3">{snack.name}</h5>

          <div className="d-flex gap-3 mx-3 my-3">
            <select
              className="form-select"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
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
