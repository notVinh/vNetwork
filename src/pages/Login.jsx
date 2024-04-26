import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    let userCredentials = {
      email,
      password,
    };
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
        navigate("/");
        toast.success("Login successfully");
      } else {
        toast.error("Email or password is incorrect");
      }
    });
  };
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <img
        src="https://res.cloudinary.com/dshvydi5f/image/upload/v1712327707/vNetwork/2655068za_zd0gh1.png"
        alt="bgLogin"
      />
      <div className="absolute top-0 bottom-0 left-40 m-auto text-text-dark-1 w-[450px] h-[500px] ">
        <div className="flex flex-col w-full h-full rounded-xl bg-dark-2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center h-full mx-3 "
          >
            <img
              src="https://res.cloudinary.com/dshvydi5f/image/upload/v1712392158/vNetwork/4112786_dslfxy.png"
              alt="logo"
              className="w-[70px] my-6 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <h1 className="text-2xl font-extrabold mb-9">
              Log in to your account
            </h1>
            <label htmlFor="name" className="text-left w-full mb-2">
              Email
            </label>
            <input
              required
              id="name"
              type="text"
              className="bg-[#1F1F22] h-[3rem] w-full focus:outline-none focus-visible:ring-primary focus-visible:outline-primary px-2 rounded-lg mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="text-left w-full mb-2">
              Password
            </label>
            <input
              required
              id="password"
              type="password"
              className="bg-[#1F1F22] h-[3rem] w-full focus:outline-none focus-visible:ring-primary focus-visible:outline-primary px-2 rounded-lg mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              className="w-full "
              style={{
                backgroundColor: "#8923e4",
                textTransform: "none",
                marginTop: "5px",
              }}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            {/* {error && (
              <div className="" role="error">
                {error}
              </div>
            )} */}

            <p className="w-full text-lef pt-4">
              {`Don't have an account?`}{" "}
              <a rel="stylesheet" href="/register" className="text-primary">
                Register
              </a>
            </p>
            <OAuth />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
