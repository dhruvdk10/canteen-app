import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "../store/useStore";
import api from "../services/Api";

const SignUp = () => {
  const { login } = useStore(); // ✅ removed addStudent

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generateReferralCode = () => {
    const initials = name.trim().slice(0, 2).toUpperCase();
    const random = Math.floor(100 + Math.random() * 900);
    return `${initials}${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !studentClass) {
      setMessage("Name and Class are required");
      return;
    }

    try {
      setLoading(true);

      const newStudent = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        class: studentClass.trim(),
        referralCode: generateReferralCode(),
        totalSpent: 0,
        orders: [],
      };

      // ✅ API CALL (REAL BACKEND)
      const res = await api.post("/students", newStudent);

      // ✅ LOGIN USER (store)
      login(res.data);

      setMessage(`✅ Student created! Referral: ${newStudent.referralCode}`);

      // Close modal
      const modalEl = document.getElementById("signupModal");
      const modal = window.bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setStudentClass("");

    } catch (err) {
      console.error(err);
      setMessage("❌ Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-box">
      <div className="container">
        <div className="modal fade" id="signupModal">
          <div
            className="modal-dialog modal-dialog-centered border-0"
            style={{ maxWidth: "400px", width: "90%", margin: "auto" }}
          >
            <div className="modal-content">

              <div className="modal-header border-0 d-block text-center position-relative">
                <h2 className="modal-title fw-bold mt-4">Sign Up</h2>
              </div>

              <div className="modal-body px-4">
                <form onSubmit={handleSubmit}>

                  <div className="input-group mb-3">
                    <span className="input-group-text bg-white border-0">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Student Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text bg-white border-0">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                      type="email"
                      className="form-control border-0"
                      placeholder="Email (optional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text bg-white border-0">
                      <FontAwesomeIcon icon={faPhone} />
                    </span>
                    <input
                      type="tel"
                      className="form-control border-0"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="input-group mb-4">
                    <span className="input-group-text bg-white border-0">
                      <FontAwesomeIcon icon={faShieldHalved} />
                    </span>
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Class / Grade"
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                    />
                  </div>

                  <button className="btn btn-secondary w-100 fw-bold" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                  </button>

                  {message && (
                    <p className="text-center mt-2 text-success">{message}</p>
                  )}

                  <div className="text-center my-3">
                    <span className="text-muted">OR Sign up with</span>
                  </div>

                  <div className="d-flex justify-content-center gap-4">
                    <button className="btn btn-outline-primary rounded-circle pb-2">
                      <FaFacebookF />
                    </button>
                    <button className="btn btn-outline-danger rounded-circle pb-2">
                      <FaGoogle />
                    </button>
                    <button className="btn btn-outline-info rounded-circle pb-2">
                      <FaTwitter />
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <span className="text-muted">
                      Already have an account?{" "}
                      <button
                        className="btn btn-link p-0"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                        data-bs-dismiss="modal"
                      >
                        Login now
                      </button>
                    </span>
                  </div>

                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
