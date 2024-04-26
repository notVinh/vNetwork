import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import React from "react";
import { AiFillHome } from "react-icons/ai";
import { sidebarItem } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  return (
    <nav className="leftsidebar ">
      <div className="flex w-full justify-center pb-2 border-b border-text-light-2">
        <img
          src="https://res.cloudinary.com/dshvydi5f/image/upload/v1712392158/vNetwork/4112786_dslfxy.png"
          alt="logo"
          className="w-[70px] cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.black" }}>
        <List component="nav" aria-label="main mailbox folders">
          {sidebarItem.map((item) => (
            <ListItemButton
              key={item.id}
              selected={selectedIndex === item.id}
              style={{ borderRadius: "7px", marginTop: "12px" }}
              onClick={() => {
                setSelectedIndex(item.id);
                navigate(item.url);
              }}
              className={`rounded-xl ${
                location.pathname === item.url &&
                "bg-gradient-to-r  from-[#877eff] to-[#e879de] text-text-dark-1"
              }`}
            >
              <div className="text-light-2xl mr-6 ">
                <img
                  src={item.imgURL}
                  alt=""
                  className={`${
                    location.pathname === item.url &&
                    "invert brightness-0 transition"
                  } `}
                />
              </div>
              <ListItemText
                primary={item.name}
                className={`text-text-light-2 ${
                  location.pathname === item.url &&
                  "invert brightness-0 transition"
                }`}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </nav>
  );
};

export default SideBar;
