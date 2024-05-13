import React, { useState } from "react";
import { sidebarItem } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import toggleSidebar from "../zustand/toggleSidebar";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const { isOpen, toggle } = toggleSidebar();

  return (
    <nav
      className={`leftsidebar ${isOpen && "min-w-[270px]"} justify-between `}
    >
      <div>
        <div className="flex w-full justify-center pb-2 border-text-light-2 h-[60px]">
          <img
            src="https://res.cloudinary.com/dshvydi5f/image/upload/v1712392158/vNetwork/4112786_dslfxy.png"
            alt="logo"
            // className={`${isOpen ? "w-[55px]" : "w-[40px]"} cursor-pointer`}
            onClick={() => navigate("/")}
          />
        </div>
        <div className="w-full ">
          {sidebarItem.map((item) => (
            <div
              className={` my-2 flex h-11 items-center rounded-lg px-2 cursor-pointer hover:bg-slate-400 ${
                location.pathname === item.url &&
                "bg-gradient-to-r  from-[#877eff] to-[#e879de] text-text-dark-1"
              }`}
              key={item.id}
              onClick={() => {
                setSelectedIndex(item.id);
                navigate(item.url);
              }}
            >
              <div className="text-light-2xl mx-1 ">
                <img
                  src={item.imgURL}
                  alt=""
                  className={`${
                    location.pathname === item.url &&
                    "invert brightness-0 transition"
                  } `}
                />
              </div>
              <div
                className={`text-text-light-2 mx-3 ${
                  isOpen ? "block" : "hidden"
                } ${
                  location.pathname === item.url &&
                  "invert brightness-0 transition"
                }`}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex w-full ${isOpen ? "justify-end" : "justify-center"}`}
      >
        <img
          src={
            isOpen
              ? "assets/icons/close-arrow.svg"
              : "assets/icons/open-arrow.svg"
          }
          alt=""
          className="w-8 bg-slate-200 rounded-full cursor-pointer "
          onClick={() => toggle(!isOpen)}
        />
      </div>
    </nav>
  );
};

export default SideBar;
