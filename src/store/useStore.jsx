import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../services/Api";

const useStore = create(
  persist(
    (set, get) => ({
      //AUTH
      user: null,
      isLoggedIn: false,

      login: (userData) =>
        set(() => ({
          user: {
            ...userData,
            loginTime: new Date().toLocaleString(),
          },
          isLoggedIn: true,
        })),

      logout: () =>
        set(() => ({
          user: null,
          isLoggedIn: false,
          cart: [],
        })),

      // CART STATE
      cart: [],

      addToCart: (newItem) =>
        set((state) => {
          const existing = state.cart.find(
            (item) => item.snack._id === newItem.snack._id
          );

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.snack._id === newItem.snack._id
                  ? {
                      ...item,
                      quantity: item.quantity + newItem.quantity,
                      studentName:
                        newItem.studentName || item.studentName,
                    }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, newItem],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => item.snack._id !== id
          ),
        })),

      updateQuantity: (id, type) =>
        set((state) => ({
          cart: state.cart.map((item) => {
            if (item.snack._id === id) {
              if (type === "inc")
                return { ...item, quantity: item.quantity + 1 };
              if (type === "dec" && item.quantity > 1)
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          }),
        })),

      clearCart: () => set({ cart: [] }),

      // 🔥 ADD THIS FUNCTION (MAIN FIX)
      placeOrder: async ({ snack, quantity, studentId }) => {
        try {
          const response = await api.post("/orders", {
            studentId,
            snackId: snack._id,
            quantity,
            amount: snack.price * quantity,
          });

          console.log("✅ Order saved:", response.data);
        } catch (error) {
          console.error("❌ Order error:", error);
          throw error;
        }
      },
    }),
    { name: "snack-store" }
  )
);

export default useStore;
