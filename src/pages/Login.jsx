import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import useStore from "../store/useStore";

const Login = () => {

  const { login } = useStore();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !password) {
      setMessage("Please enter name and password");
      return;
    }

    // Store user
    login({ name });

    // Close modal
    const modalEl = document.getElementById("loginModal");
    const modal = window.bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    // reset
    setName("");
    setPassword("");
    setMessage("");
  };

  return (
    <section className="form-box">
      <div className="modal fade" id="loginModal">
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
          <div className="modal-content">

            {/* Header */}
            <div className="modal-header border-0 d-block text-center position-relative">
              <h2 className="modal-title fw-bold mt-4">Login</h2>
            </div>

            {/* Body */}
            <div className="modal-body px-4">
              <form onSubmit={handleLogin}>

                {/* Name */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-white border-0">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="input-group mb-4">
                  <span className="input-group-text bg-white border-0">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="password"
                    className="form-control border-0"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button className="btn btn-secondary w-100 fw-bold">
                  Login
                </button>
              </form>

              {/* Divider */}
              <div className="text-center my-3">
                <span className="text-muted">OR</span>
              </div>

              {/* Social Login */}
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

              {/* Switch to Signup */}
              <div className="text-center mt-3">
                <span className="text-muted">
                  Don't have an account?{" "}
                  <button
                    className="btn btn-link p-0"
                    data-bs-toggle="modal"
                    data-bs-target="#signupModal"
                    data-bs-dismiss="modal"
                  >
                    Sign up now
                  </button>
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
