import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import Cart from "./pages/Cart";
import { Routes, Route, useLocation } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import useStore from "./store/useStore"; 

function App() {

  const { students, placeOrder } = useStore();

  const [showSplash, setShowSplash] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && !sessionStorage.getItem("splashShown")) {
      setShowSplash(true);
      sessionStorage.setItem("splashShown", "true");
    }
  }, [location]);

  const handlePlaceOrder = (snack, studentId, quantity) => {
    if (!studentId) return;

    placeOrder({
      studentId: Number(studentId),
      snack,
      quantity,
    });
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <>
      <Navbar />
      <SignUp />
      <Login />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/students" element={<Students />} />

        <Route path="/students/:id" element={<StudentDetail />} />

        <Route
          path="/cart"
          element={
            <Cart
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
