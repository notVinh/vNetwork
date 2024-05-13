import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { deleteCommentByPost } from "../redux/commentSlice";
import { useState } from "react";
import { deletePost } from "../redux/postSlice";
import { useNavigate } from "react-router-dom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function PostMenu({ postId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const postCredentials = {
      postId: postId,
    };
    await dispatch(deleteCommentByPost(postCredentials));
    await dispatch(deletePost(postCredentials)).then(() => {
      setSuccess(true);
      navigate(0);
    });
  };

  return (
    <div>
      <div onClick={handleClick} className="cursor-pointer">
        <img src="/assets/icons/menu2.svg" className="w-[20px]" />
      </div>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          {/* <EditIcon /> */}
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} disableRipple style={{ color: "red" }}>
          {/* <FileCopyIcon /> */}
          Delete
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple style={{ color: "red" }}>
          {/* <FileCopyIcon /> */}
          Report
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
