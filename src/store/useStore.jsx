import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      // AUTH STATE
      user: null,
      isLoggedIn: false,

      login: (userData) =>
        set({
          user: userData,
          isLoggedIn: true,
        }),

      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
        }),

      // 🛒 CART STATE
      cart: [],
      orders: [],

      // Add to cart
      addToCart: (item) =>
        set((state) => ({
          cart: [...state.cart, item],
        })),

      // Remove from cart
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.snack.id !== id),
        })),

      // Update quantity
      updateQuantity: (id, type) =>
        set((state) => ({
          cart: state.cart.map((item) => {
            if (item.snack.id === id) {
              if (type === "inc") {
                return { ...item, quantity: item.quantity + 1 };
              }
              if (type === "dec" && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
              }
            }
            return item;
          }),
        })),

      // Place order
      placeOrder: (orderData) =>
        set((state) => ({
          orders: [...state.orders, orderData],
          cart: [],
        })),
    }),
    {
      name: "snack-store",
    }
  )
);

export default useStore;
