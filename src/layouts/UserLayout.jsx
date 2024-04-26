import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const UserLayout = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme:light)");
    // console.log(query.matches);
    if (query.matches !== true) {
      setTheme("dark");
    }
  }, []);

  return (
    <>
      <div className={`w-full md:flex bg-black text-text-dark-1 ${theme}`}>
        {/* <button
          onClick={() => {
            if (theme !== "dark") {
              setTheme("dark");
            } else {
              setTheme("");
            }
          }}
        >
          Vinh
        </button> */}
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
