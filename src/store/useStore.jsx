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
          cart: state.cart.filter(
            (item) => item.snack.id !== id
          ),
        })),

      updateQuantity: (id, type) =>
        set((state) => ({
          cart: state.cart.map((item) => {
            if (item.snack.id === id) {
              if (type === "inc") {
                return {
                  ...item,
                  quantity: item.quantity + 1,
                };
              }
              if (type === "dec" && item.quantity > 1) {
                return {
                  ...item,
                  quantity: item.quantity - 1,
                };
              }
            }
            return item;
          }),
        })),

      clearCart: () => set({ cart: [] }),

      // ORDERS STATE
      orders: [],

      placeOrder: (orderData) =>
        set((state) => {
          if (state.cart.length === 0) return state;

          return {
            orders: [
              ...state.orders,
              {
                ...orderData,
                id: Date.now(),
                date: new Date().toLocaleString(),
              },
            ],
            cart: [],
          };
        }),

    }),
    {
      name: "snack-store",
    }
  )
);

export default useStore;
