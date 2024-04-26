import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/userSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let userCredentials = {
      email,
      password,
      name,
      username,
    };
    dispatch(registerUser(userCredentials)).then((result) => {
      if (!result.error) {
        navigate("/login");
        toast.success("Register successfully, please login");
      } else {
        toast.error("Register Fail");
      }
    });
  };
  return (
    <>
      <div className="w-screen h-screen relative overflow-hidden">
        <img
          src="https://res.cloudinary.com/dshvydi5f/image/upload/v1712327707/vNetwork/2655068za_zd0gh1.png"
          alt="bgLogin"
        />

        <div className="absolute top-0 bottom-0 left-40 m-auto text-text-dark-1 w-[450px] h-full py-6 ">
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
              <label htmlFor="username" className="text-left w-full mb-2">
                Username
              </label>
              <input
                required
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="bg-[#1F1F22] h-[3rem] w-full focus:outline-none focus-visible:ring-primary focus-visible:outline-primary px-2 rounded-lg mb-4"
              />
              <label htmlFor="name" className="text-left w-full mb-2">
                Name
              </label>
              <input
                required
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="bg-[#1F1F22] h-[3rem] w-full focus:outline-none focus-visible:ring-primary focus-visible:outline-primary px-2 rounded-lg mb-4"
              />
              <label htmlFor="email" className="text-left w-full mb-2">
                Email
              </label>
              <input
                required
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-[#1F1F22] h-[3rem] w-full focus:outline-none focus-visible:ring-primary focus-visible:outline-primary px-2 rounded-lg mb-4"
              />

              <label htmlFor="password" className="text-left w-full mb-2">
                Password
              </label>
              <input
                required
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-[#1F1F22] h-[3rem] w-full focus:outline-none focus-visible:ring-primary focus-visible:outline-primary px-2 rounded-lg mb-4"
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
                Register
              </Button>

              <p className="w-full text-lef pt-4">
                {`You have ave an account?`}{" "}
                <a rel="stylesheet" href="/login" className="text-primary">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
