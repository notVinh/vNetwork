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
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import Chat from "./pages/Chat.jsx";
import MyPost from "./pages/MyPost.jsx";

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
    element: (
      <AuthContextProvider>
        <SocketContextProvider>
          {" "}
          <UserLayout />
        </SocketContextProvider>
      </AuthContextProvider>
    ),
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
        element: (
          <AuthContextProvider>
            <SocketContextProvider>
              <UserLayout />
            </SocketContextProvider>
          </AuthContextProvider>
        ),
        children: [
          { path: "/bookmark", element: <Bookmark /> },
          { path: "/mypost", element: <MyPost /> },
          { path: "/people", element: <People /> },
          { path: "/chat", element: <Chat /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
