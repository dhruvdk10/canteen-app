import { useState, useEffect, useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

function OrderModal({
  show,
  onClose,
  snack,
  students,
  setCart,
  onPlaceOrder, // ✅ IMPORTANT
}) {
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

  // ✅ Add to Cart
  const handleAddToCart = () => {
    if (!snack) return;

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.snack.id === snack.id
      );

      if (existing) {
        return prev.map((item) =>
          item.snack.id === snack.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [...prev, { snack, quantity }];
    });

    alert(`${quantity} ${snack.name}(s) added to cart!`);
    bsModalRef.current?.hide();
  };

  // ✅ Place Order (NO API)
  const handlePlaceOrder = () => {
    if (!studentId) {
      alert("Please select a student");
      return;
    }

    // 🔥 Send data to parent (Home.jsx)
    onPlaceOrder(snack, Number(studentId), quantity);

    alert("Order placed successfully!");
    bsModalRef.current?.hide();
  };

  return (
    <div
      className="modal fade"
      ref={modalRef}
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* Image */}
          <div className="text-center mb-3">
            <img
              src={snack.image}
              alt={snack.name}
              className="card-img-top"
            />

            <div
              className="snack-type-square position-absolute"
              style={{ top: "20px", left: "20px" }}
            >
              <span
                className={`snack-type-dot ${
                  snack.type === "veg"
                    ? "veg-dot"
                    : "non-veg-dot"
                }`}
              ></span>
            </div>
          </div>

          <h5 className="mb-3 mx-3">{snack.name}</h5>

          {/* Select + Quantity */}
          <div className="d-flex gap-3 mx-3 mb-3">

            {/* Student */}
            <select
              className="form-select"
              value={studentId}
              onChange={(e) =>
                setStudentId(e.target.value)
              }
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* Quantity */}
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() =>
                  setQuantity((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                className="btn btn-sm btn-outline-success"
                onClick={() =>
                  setQuantity((prev) => prev + 1)
                }
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-2 mx-3 mb-3">
            <button
              className="btn btn-warning w-50"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-success w-50"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default OrderModal;
