// import { createContext, useContext, useState } from "react";
// import api from "../services/Api";
// import { useAuth } from "./AuthContext";

// const OrderContext = createContext();

// export const useOrder = () => useContext(OrderContext);

// export const OrderProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [cart, setCart] = useState([]);

//   const placeOrder = async () => {
//     if (!user) return alert("Please login first!");
//     if (cart.length === 0) return alert("Cart is empty!");

//     try {
//       const res = await api.post("/orders", {
//         studentId: user._id,
//         orders: cart,
//       });
//       setCart([]);
//       console.log("Order placed globally:", res.data);
//     } catch (err) {
//       console.error("Failed to place order:", err);
//     }
//   };

//   return (
//     <OrderContext.Provider value={{ cart, setCart, placeOrder }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };
