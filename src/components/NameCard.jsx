import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";
import toggleMessageBox from "../zustand/toggleMessageBox";
import toggleMessagebar from "../zustand/toggleMessagebar";
import useConversation from "../zustand/useConversation";

const NameCard = ({ data }) => {
  // console.log(data);

  const { authUser } = useAuthContext();

  const { open } = toggleMessagebar();

  const { isOpen, toggle, recieverInfo, setRecieverInfo } = toggleMessageBox();

  const { selectedConversation, setSelectedConversation } = useConversation();
  // console.log(selectedConversation);

  const isCurrentUser = data?._id === authUser?._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(data?._id);
  // console.log(onlineUsers);

  // console.log(recieverInfo);
  return (
    <div
      className={`${
        isCurrentUser ? "hidden" : "flex"
      } text-text-light-2 dark:text-text-dark-1 ${
        open && "min-w-[14rem] border-2 dark:border-dark-5"
      } rounded-full px-1 py-0 items-center justify-start  bg-light-1 dark:bg-dark-3 min-h-[44px] my-3 hover:cursor-pointer`}
      onClick={() => {
        setSelectedConversation(data);
        setRecieverInfo(data);
        toggle(true);
      }}
    >
      <div className="flex items-center justify-center relative">
        <img
          src={
            data?.profilePicture
              ? data?.profilePicture
              : "https://res.cloudinary.com/dshvydi5f/image/upload/v1709050096/vShop/images/womansplash_j6ahxo.png"
          }
          alt=""
          className="w-[30px] h-[30px] rounded-full m-[5px]"
        />
        {isOnline && (
          <div className="w-2 h-2 rounded-full bg-green-500 absolute right-1 top-1"></div>
        )}
      </div>
      {/* <div className="h-5 w-[1px] border mx-2 border-light-3 dark:border-gray-600"></div> */}
      {open && <div className="flex-1 ml-2">{data?.name}</div>}
    </div>
  );
};

export default NameCard;
