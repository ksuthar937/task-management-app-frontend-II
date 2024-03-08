import "./App.css";
import Header from "./components/Header";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Task from "./pages/Task";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "Register",
    element: <Register />,
  },
  {
    path: "Task",
    element: <Task />,
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
