import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import Footer from "../components/Footer";

function Cart() {
  const navigate = useNavigate();

  const {
    cart = [],
    students = [],
    updateQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [location, setLocation] = useState("");

  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + item.snack.price * item.quantity,
      0
    );
  };

  const handlePlaceOrderClick = () => {
    if (!location) {
      alert("Please enter delivery location");
      return;
    }

    const missingStudent = cart.some(item => !item.studentId);
    if (missingStudent) {
      alert("Some items do not have a selected student. Please check your cart.");
      return;
    }

    const orderData = {
      items: cart.map(item => ({
        snack: item.snack,
        quantity: item.quantity,
        studentId: item.studentId,
        studentName: item.studentName || "Unknown", //
      })),
      paymentMethod,
      location,
      total: getTotal(),
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, orderData]));

    // Place orders via Zustand
    cart.forEach((item) => {
      placeOrder({
        snack: item.snack,
        quantity: item.quantity,
        studentId: item.studentId,
      });
    });

    clearCart();
    alert(`Order placed via ${paymentMethod} 🚀`);
    navigate("/");
  };

  const updateQty = (id, type) => updateQuantity(id, type);
  const removeItem = (id) => removeFromCart(id);

  return (
    <>
    <div className="main-content container py-4">
      <h2 className="mb-4 text-center text-md-start">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-muted text-center">Your cart is empty</p>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {cart.map((item) => (
              <div key={item.snack.id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between position-relative">
                    {/* Image */}
                    <div style={{ width: "60px", height: "60px" }}>
                      <img
                        src={item.snack.image}
                        className="img rounded"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        alt={item.snack.name}
                      />
                    </div>

                    {/* Name + Student */}
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">{item.snack.name}</h6>
                      <small className="text-muted">
                        For: {item.studentName || students.find(s => s.id === item.studentId)?.name || "Unknown"}
                      </small>
                    </div>

                    {/* Veg/Non-Veg Dot */}
                    <div
                      className="snack-type-square position-absolute"
                      style={{ top: "10px", left: "10px", zIndex: 2 }}
                    >
                      <span
                        className={`snack-type-dot ${
                          item.snack.type === "veg" ? "veg-dot" : "non-veg-dot"
                        }`}
                      ></span>
                    </div>

                    {/* Price */}
                    <div style={{ width: "40px" }} className="ms-2">
                      ₹{item.snack.price * item.quantity}
                    </div>

                    {/* Quantity */}
                    <div className="d-flex gap-1 ms-2 align-items-center">
                      <button
                        className="quantity-btn minus-btn"
                        onClick={() => updateQty(item.snack.id, "dec")}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn plus-btn"
                        onClick={() => updateQty(item.snack.id, "inc")}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      className="btn btn-sm btn-danger ms-3"
                      onClick={() => removeItem(item.snack.id)}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="card p-3 shadow-sm">
              <h4>Total: ₹{getTotal()}</h4>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Delivery location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <select
                className="form-control mb-3"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="COD">COD</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
              </select>

              <button
                className="btn btn-success w-100"
                onClick={handlePlaceOrderClick}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
}

export default Cart;
