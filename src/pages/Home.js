import React from "react";

import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.outer}>
      <h1 className={styles.heading}>Welcome to the Task Management App</h1>

      <p className={styles.textDesc}>
        Manage your tasks efficiently with our professional task management app.
      </p>
      <div className={styles.btn}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("login")}
        >
          Login
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => navigate("register")}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Home;
