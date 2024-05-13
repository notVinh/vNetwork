import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import useGetNofications from "../hooks/useGetNofications";
import useListenNofications from "../hooks/useListenNofications";
import useReadNofications from "../hooks/useReadNofications";

const Nofication = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { nofications } = useGetNofications();

  useListenNofications();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { markAsReadAll } = useReadNofications();
  return (
    <>
      <div className="">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            padding: "0",
          }}
        >
          <Tooltip title="Account settings">
            <IconButton
              style={{ padding: "0" }}
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <div className="relative group mx-3 rounded-full p-2 flex items-center justify-center hover:bg-[#877eff] cursor-pointer">
                <img
                  src={"/assets/icons/bell.svg"}
                  alt=""
                  className="w-[30px] group-hover:invert-white"
                />
                {nofications.length > 0 && (
                  <div className="absolute top-[5px] right-[5px] bg-[#F14D4D] text-white w-4 h-4 text-xs text-center rounded-full">
                    {nofications.length}
                  </div>
                )}
              </div>
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
              backgroundColor: "white",
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
                left: 30,
                width: 10,
                height: 10,
                bgcolor: "#fff",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        >
          <List
            sx={{
              width: "400px",
              maxWidth: 360,
              maxHeight: 360,
              bgcolor: "background.paper",
              overflow: "scroll",
            }}
          >
            {!nofications.length > 0 && (
              <div className="w-full text-black text-center pt-2">
                Have no new nofication
              </div>
            )}
            {nofications.map((nofication) => (
              <div key={nofication._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    style={{ color: "black" }}
                    primary="Post 1"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {nofication.name}
                        </Typography>
                        {` da ${nofication.actions} bai viet cua ban`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
          </List>
          {nofications.length > 0 && (
            <div
              className="text-purple-400 w-full text-center cursor-pointer"
              onClick={() => markAsReadAll()}
            >
              Mark all as read
            </div>
          )}
        </Menu>
      </div>
    </>
  );
};

export default Nofication;
