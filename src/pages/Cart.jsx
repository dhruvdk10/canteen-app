import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    students,
    updateQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
  } = useStore(); 

  const [selectedStudent, setSelectedStudent] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [location, setLocation] = useState("");

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

    cart.forEach((item) => {
      placeOrder({
        studentId: Number(selectedStudent),
        snack: item.snack,
        quantity: item.quantity,
      });
    });

    clearCart();

    alert(`Order placed via ${paymentMethod} 🚀`);
    navigate("/");
  };

  if (!cart) return null;

  return (
    <div className="container py-4">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.snack.id} className="card mb-2 p-2">
              <h6>{item.snack.name}</h6>
              <p>₹{item.snack.price * item.quantity}</p>

              <button onClick={() => updateQuantity(item.snack.id, "dec")}>-</button>
              {item.quantity}
              <button onClick={() => updateQuantity(item.snack.id, "inc")}>+</button>

              <button onClick={() => removeFromCart(item.snack.id)}>Remove</button>
            </div>
          ))}

          <h4>Total: ₹{getTotal()}</h4>

          <select onChange={(e) => setSelectedStudent(e.target.value)}>
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button onClick={handlePlaceOrderClick}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
