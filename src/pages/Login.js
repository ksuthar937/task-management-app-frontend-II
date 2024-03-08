import styles from "./Login.module.css";
import Hero from "../assets/hero.png";
import { useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });

  const handleUserData = (e) => {
    setUser((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, user);
      // console.log(data);
      if (data.user) {
        navigate("/task");

        localStorage.setItem("token", data?.token);
        toast.success("Login Successfully");
      }
    } catch (error) {
      if (error.request.response === '{"message":"User not found"}') {
        toast.error("User doesn't exist! Please Register");
      } else if (
        error.request.response === '{"message":"Invalid Credentials!"}'
      ) {
        toast.error("Invalid Credentials");
      } else {
        toast.error("Login Error");
      }
      // console.log(error);
    }
  };

  // --- API REQUEST HERE ---

  return (
    <div className={styles.outer}>
      <div>
        <img className={styles.hero} src={Hero} alt="hero" />
      </div>
      <div className={styles.loginform}>
        <h1 className="mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              value={user.email}
              onChange={handleUserData}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              value={user.password}
              onChange={handleUserData}
              type="password"
              className="form-control"
              id="password"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="m-2 d-flex gap-1 justify-content-center .text-primary">
            Don't have an account?
            <span
              role="button"
              tabIndex="0"
              onClick={() => navigate("/register")}
              className="text-primary fw-semibold font-monospace"
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
