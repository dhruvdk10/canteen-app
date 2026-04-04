// import { createContext, useContext, useState, useEffect } from "react";
// import api from "../services/Api";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // check local storage for logged in user
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setUser(storedUser);
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       setUser(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));
//       return res.data;
//     } catch (err) {
//       console.error("Login failed:", err);
//       throw err;
//     }
//   };

//   const signup = async (name, email, password) => {
//     try {
//       const res = await api.post("/auth/signup", { name, email, password });
//       setUser(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));
//       return res.data;
//     } catch (err) {
//       console.error("Signup failed:", err);
//       throw err;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, signup, logout, loading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
