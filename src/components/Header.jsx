import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import NewPostModal from "./NewPostModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutUser } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import Nofication from "./Nofication";
import Search from "./Search";
import useDebounc from "../hooks/useDebounc";

const Header = () => {
  const { authUser } = useAuthContext();
  const [user, setUser] = useState(authUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNewPost, setOpenNewPost] = useState(false);

  // console.log(user);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  // console.log(openNewPost);
  // console.log(user?.profilePicture);

  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signoutUser()).then(navigate("/login"));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="min-h-20 bg-white text-textColor flex border-b-2 xl:border-none justify-between items-center px-6 dark:bg-dark-2 shadow-md">
        <h1 className="hidden xl:block">Home</h1>
        <img
          src="https://res.cloudinary.com/dshvydi5f/image/upload/v1712392158/vNetwork/4112786_dslfxy.png"
          alt="logo"
          // className={`${isOpen ? "w-[55px]" : "w-[40px]"} cursor-pointer`}
          onClick={() => navigate("/")}
          className="w-12 xl:hidden"
        />

        <div className="flex xl:border-2 rounded-full px-1 py-0 items-center justify-center min-w-[14rem] xl:bg-white xl:dark:bg-dark-3 dark:border-dark-5 min-h-[44px]">
          <div
            className="group xl:mx-3 rounded-full p-2 flex items-center justify-center hover:bg-[#877eff] cursor-pointer"
            onClick={() => {
              if (user === null) {
                toast.error("Please login before posting");
              } else {
                setOpenNewPost(true);
              }
            }}
          >
            <img
              src="/assets/icons/add.svg"
              className="w-[30px] group-hover:invert-white"
            />
          </div>

          <Search />

          <div
            className="group xl:mx-3 rounded-full p-2 flex items-center justify-center hover:bg-[#877eff] cursor-pointer"
            onClick={() => navigate("/chat")}
          >
            <img
              src="/assets/icons/chat2.svg"
              className="w-[30px] group-hover:invert-white"
            />
          </div>
          {/* <div className="group mx-3 rounded-full p-2 flex items-center justify-center hover:bg-[#877eff] cursor-pointer">
            <img
              src="/assets/icons/bell.svg"
              className="w-[30px] group-hover:invert-white"
            />
          </div> */}
          {/* <div className="group mx-3 rounded-full p-2 flex items-center justify-center hover:bg-[#877eff] cursor-pointer"> */}
          <Nofication />
          {/* </div> */}
        </div>

        <div className="hidden xl:block">
          <div
            onClick={() => {
              navigate("/login");
            }}
            className={` ${
              !user ? "flex" : "hidden"
            } border-2 border-light-3 bg-white dark:bg-dark-3 dark:border-dark-5 rounded-full px-1 py-0 items-center justify-start min-w-[14rem]  min-h-[44px] text-text-light-2 hover:bg-[#877eff] hover:text-white cursor-pointer`}
          >
            <div className="text-center flex-1 ">Sign In</div>
          </div>
          <div
            className={`${
              user ? "flex" : "hidden"
            } border-2  bg-white dark:bg-dark-3 dark:border-dark-5 rounded-full px-1 py-0 items-center justify-start min-w-[14rem]  min-h-[44px]`}
          >
            <div className="flex items-center justify-center">
              {/* <img
                src="https://res.cloudinary.com/dshvydi5f/image/upload/v1709050096/vShop/images/womansplash_j6ahxo.png"
                alt=""
                className="w-[30px] h-[30px] rounded-full"
              /> */}
              <div>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <img
                        src={user?.profilePicture}
                        alt=""
                        className="w-[30px] h-[30px] rounded-full"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  sx={{}}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      backgroundColor: "#1a1d1f",
                      color: "#fff",
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "#1a1d1f",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "left", vertical: "top" }}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>v</ListItemIcon>
                    Add another account
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>v</ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleSignout}>
                    <ListItemIcon>v</ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div className="h-5 w-[1px] border mx-2 border-light-3"></div>
            <div className="text-center flex-1 text-text-light-2">
              {user && user.name}
              {/* Đặng Quang Vinh */}
            </div>
          </div>
        </div>
      </div>
      <NewPostModal
        openModal={openNewPost}
        closeModal={() => {
          setOpenNewPost(!openNewPost);
        }}
      />
    </>
  );
};

export default React.memo(Header);
