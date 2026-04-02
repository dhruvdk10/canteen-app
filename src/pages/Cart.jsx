import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart, students, onPlaceOrder }) {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const updateQty = (id, type) => {
    setCart(prev =>
      prev.map(item => {
        if (item.snack.id === id) {
          if (type === "inc") return { ...item, quantity: item.quantity + 1 };
          if (type === "dec" && item.quantity > 1)
            return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.snack.id !== id));
  };

  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + item.snack.price * item.quantity,
      0
    );
  };

  const handlePlaceOrderClick = () => {
    if (!selectedStudent || !location) {
      alert("Please fill all details");
      return;
    }

    const orderData = {
      items: cart,
      student: students.find(s => s.id == selectedStudent)?.name,
      paymentMethod,
      location,
      total: getTotal(),
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, orderData])
    );

    cart.forEach(item => {
      onPlaceOrder(item.snack, selectedStudent, item.quantity);
    });

    setCart([]);
    alert(`Order placed via ${paymentMethod} 🚀`);
    navigate("/");
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center text-md-start">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-muted text-center">Your cart is empty</p>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {cart.map((item) => (
              <div key={item.snack.id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <div className="row align-items-center">

                    {/* Image */}
                    <div className="col-4 col-md-2 text-center mb-2 mb-md-0">
                      <img
                        src={item.snack.image}
                        alt={item.snack.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: "70px", objectFit: "cover" }}
                      />
                    </div>

                    {/* Info */}
                    <div className="col-8 col-md-4">
                      <h6 className="mb-1">{item.snack.name}</h6>
                      <small className="text-muted">
                        ₹{item.snack.price} each
                      </small>
                    </div>

                    {/* Quantity */}
                    <div className="col-6 col-md-3 mt-2 mt-md-0">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn-outline-secondary text-danger btn-sm btn"
                          onClick={() => updateQty(item.snack.id, "dec")}
                        >
                          -
                        </button>
                        <span className="fw-bold">{item.quantity}</span>
                        <button
                          className="btn-outline-secondary text-success btn-sm btn"
                          onClick={() => updateQty(item.snack.id, "inc")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price + Remove */}
                    <div className="col-6 col-md-3 text-end mt-2 mt-md-0">
                      <div className="fw-semibold mb-1">
                        ₹{item.snack.price * item.quantity}
                      </div>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeItem(item.snack.id)}
                      >
                        Remove
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card p-3 shadow-sm sticky-top" style={{ top: "80px" }}>
              <h4 className="mb-3">Total: ₹{getTotal()}</h4>

              {/* Student */}
              <select
                className="form-control mb-3"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Select Student</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

              {/* Location */}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter delivery location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              {/* Payment */}
              <select
                className="form-control mb-3"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="COD">Cash on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="Card">Debit/Credit Card</option>
              </select>

              <button
                className="btn btn-success w-100"
                disabled={!cart.length}
                onClick={handlePlaceOrderClick}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
