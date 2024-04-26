import { BrowserRouter, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout.jsx";
import Home from "./pages/Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Bookmark from "./pages/Bookmark.jsx";
import People from "./pages/People.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = () => {
  const currenUser = localStorage.getItem("user");
  // const { user } = useSelector((state) => state.user);
  // console.log(user);
  return currenUser ? <Outlet /> : <Navigate to="/login" />;
};

const OnlyAdminPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [{ path: "", element: <Home /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    element: <PrivateRoute />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { path: "/bookmark", element: <Bookmark /> },
          { path: "/people", element: <People /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
