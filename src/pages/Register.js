import styles from "./Register.module.css";
import Hero from "../assets/hero.png";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserData = (e) => {
    setUser((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      toast.error("Password and confirm password doesn't match");
      return;
    }
    try {
      const data = await axios.post(`${API_BASE_URL}/auth/register`, {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      // console.log(data);

      if (data.status === 201) {
        console.log(data.status);
        toast.success("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      if (error.request.response === '{"message":"User already exist!"}') {
        toast.error("User already exist! Please Login");
      } else {
        toast.error("Oops! Something went wrong");
        // console.log(error.request.response);
      }
    }
  };

  return (
    <div className={styles.outer}>
      <div>
        <img className={styles.hero} src={Hero} alt="hero" />
      </div>
      <div className={styles.loginform}>
        <h1 className="mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              required
              value={user.username}
              onChange={handleUserData}
              type="text"
              className="form-control"
              id="username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              required
              value={user.email}
              onChange={handleUserData}
              type="email"
              className="form-control "
              id="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              required
              value={user.password}
              onChange={handleUserData}
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              required
              value={user.confirmPassword}
              onChange={handleUserData}
              type="password"
              className="form-control"
              id="confirmPassword"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="m-2 d-flex gap-1 justify-content-center .text-primary">
            Already have an account?{" "}
            <span
              role="button"
              tabIndex="0"
              onClick={() => navigate("/login")}
              className="text-primary  fw-semibold font-monospace"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
