import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
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
            (item) => item.snack.id === newItem.snack.id
          );

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.snack.id === newItem.snack.id
                  ? {
                      ...item,
                      quantity: item.quantity + newItem.quantity,
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
          cart: state.cart.filter((item) => item.snack.id !== id),
        })),

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

      clearCart: () => set({ cart: [] }),

      orders: [],
      students: [],

      placeOrder: ({ studentId, snack, quantity }) =>
        set((state) => {
          const updatedStudents = (state.students || []).map((student) => {
            if (student.id === studentId) {
              const newOrder = {
                id: Date.now(),
                snackName: snack.name,
                quantity,
                amount: snack.price * quantity,
              };

              return {
                ...student,
                totalSpent: (student.totalSpent || 0) + newOrder.amount,
                orders: [...(student.orders || []), newOrder],
              };
            }
            return student;
          });

          return {
            students: updatedStudents,
            cart: [],
          };
        }),
    }),
    { name: "snack-store" }
  )
);

export default useStore;
