import React, { useEffect, useState } from "react";
import styles from "./Task.module.css";
import Table from "../components/Table";
import { useNavigate } from "react-router";

import { API_BASE_URL } from "../config";
import axios from "axios";
import toast from "react-hot-toast";

const Task = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const handleNewTasks = (e) => {
    const value = e.target.value;
    const name = e.target.id;
    setNewTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/tasks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(res.data);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setNewTask({
      title: "",
      description: "",
      priority: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const createTask = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/tasks`, newTask, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(res);
      toast.success("Task successfully created");
      setNewTask({
        title: "",
        description: "",
        priority: "",
      });
      fetchData();
    } catch (error) {
      toast.error("Oops! Something wrong");
      console.log(error);
    }
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    createTask();
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(res);
      toast.success("Task successfully deleted");
      fetchData();
    } catch (error) {
      toast.error("Oops! Something wrong");
      console.log(error);
    }
  };

  const handleUpdate = async (prevData, id) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/tasks/${id}`,
        { ...prevData, isCompletedTask: true },
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res);
      toast.success("Task successfully updated");

      fetchData();
    } catch (error) {
      toast.error("Oops! Something wrong");
      console.log(error);
    }
  };

  return (
    <div className={styles.outer}>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h4 className="m-0">Create Task</h4>
        <button
          onClick={handleLogout}
          type="button"
          className="btn btn-outline-secondary btn-sm mx-2"
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleCreateTask}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Task Details
          </label>
          <input
            onChange={handleNewTasks}
            value={newTask.title}
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            onChange={handleNewTasks}
            value={newTask.description}
            className="form-control"
            rows="3"
            placeholder="Description"
            id="description"
            required
          ></textarea>
        </div>
        <div className="d-flex gap-2">
          <select
            className="form-select form-select-sm w-25 "
            aria-label="Small select example"
            id="priority"
            value={newTask.priority}
            onChange={handleNewTasks}
            required
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit" className="btn btn-success btn-sm">
            Save Task
          </button>
          <button
            onClick={handleCancel}
            type="button"
            className="btn btn-danger btn-sm"
          >
            Cancel
          </button>
        </div>
      </form>
      {tasks ? (
        <>
          {tasks.filter((task) => !task.isCompletedTask).length > 0 ? (
            <Table
              tasks={tasks.filter((task) => !task.isCompletedTask)}
              status="progress"
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ) : null}
          {tasks.filter((task) => task.isCompletedTask).length > 0 ? (
            <Table
              tasks={tasks.filter((task) => task.isCompletedTask)}
              status="completed"
              handleDelete={handleDelete}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default Task;
