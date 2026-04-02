import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";
import api from "./services/Api";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [cart, setCart] = useState([]);
  const [students, setStudents] = useState([]);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const splashShown = localStorage.getItem("splashShown");
    if (!splashShown) {
      setShowSplash(true);
      localStorage.setItem("splashShown", "true");
    }
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handlePlaceOrder = async (snack, studentId, quantity) => {
    if (!studentId) return;
    try {
      const student = students.find((s) => s.id === Number(studentId));
      const newOrder = {
        id: Date.now(),
        snackName: snack.name,
        quantity,
        amount: snack.price * quantity,
      };
      const updatedStudent = {
        ...student,
        totalSpent: student.totalSpent + newOrder.amount,
        orders: [...student.orders, newOrder],
      };
      await api.put(`/students/${studentId}`, updatedStudent);
      setStudents((prev) =>
        prev.map((s) =>
          s.id === Number(studentId) ? updatedStudent : s
        )
      );
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

  return showSplash ? (
    <SplashScreen onFinish={() => setShowSplash(false)} />
  ) : (
    <>
      <Navbar />
      <SignUp />
      <Login />
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              students={students}
              onPlaceOrder={handlePlaceOrder}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
