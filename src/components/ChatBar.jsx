import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";
import toggleMessageBox from "../zustand/toggleMessageBox";
import useConversation from "../zustand/useConversation";

const ChatBar = ({ data }) => {
  // console.log(data);

  const { authUser } = useAuthContext();

  const { isOpen, toggle, recieverInfo, setRecieverInfo } = toggleMessageBox();

  const { selectedConversation, setSelectedConversation } = useConversation();
  // console.log(selectedConversation);

  const isCurrentUser = data._id === authUser._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(data?._id);
  // console.log(onlineUsers);

  // console.log(recieverInfo);
  return (
    <div
      className={`${
        isCurrentUser ? "hidden" : "flex"
      } text-text-light-2 dark:text-text-dark-1 border-2 dark:border-dark-5 rounded-xl px-1 py-0 items-center justify-start min-w-[14rem] bg-light-1 dark:bg-dark-3 min-h-[60px] my-1 hover:cursor-pointer`}
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
          className="w-[40px] h-[40px] rounded-full m-[5px]"
        />
        {isOnline && (
          <div className="w-2 h-2 rounded-full bg-green-500 absolute right-1 top-1"></div>
        )}
      </div>
      <div className="ml-4">
        <div className="text-center flex-1 font-bold ">{data?.name}</div>
        <div className="text-black">Vinh</div>
      </div>
    </div>
  );
};

export default ChatBar;
