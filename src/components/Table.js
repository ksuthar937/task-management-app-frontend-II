import React from "react";
import DeleteIcon from "../assets/delete-bin-line.svg";
import TaskArrow from "../assets/task-line.svg";

import styles from "./Table.module.css";

const Table = ({ tasks, status, handleDelete, handleUpdate }) => {
  const getPriorityClassNames = (priority) => {
    if (priority === "Low") {
      return "text-white bg-primary p-1 px-2 rounded";
    } else if (priority === "Medium") {
      return "text-white bg-warning p-1 px-2 rounded";
    } else {
      return "text-white bg-danger p-1 px-2 rounded";
    }
  };

  return (
    <>
      {
        <div className="my-5">
          {status === "progress" ? (
            <h1>In Progress Task</h1>
          ) : (
            <h1>Completed Task</h1>
          )}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Task Status</th>
                <th scope="col">Task</th>
                <th scope="col">Priority</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {tasks.map((task, index) => (
              <tbody key={index}>
                <tr>
                  {status === "progress" ? (
                    <td>In Progress</td>
                  ) : (
                    <td>Completed</td>
                  )}
                  <td>
                    {task.title}
                    <p className="m-0 p-0 text-secondary ">
                      {task.description}
                    </p>
                  </td>
                  <td>
                    <span className={getPriorityClassNames(task.priority)}>
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    {status === "progress" ? (
                      <button
                        className={styles.hiddenbtn}
                        onClick={() => {
                          handleUpdate({ task }, task._id);
                        }}
                      >
                        <img src={TaskArrow} alt="deleteBin" width={20} />
                      </button>
                    ) : (
                      <button
                        className={styles.hiddenbtn}
                        onClick={() => {
                          handleDelete(task._id);
                        }}
                      >
                        <img src={DeleteIcon} alt="deleteBin" width={20} />
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      }
    </>
  );
};

export default Table;
