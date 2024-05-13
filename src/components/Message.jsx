import React from "react";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import useListenMessages from "../hooks/useListenMessages";

const Message = ({ data }) => {
  const { authUser } = useAuthContext();

  const { selectedConversation } = useConversation();

  useListenMessages();

  const meChat = data.senderId === authUser?._id;
  // console.log(data);
  return (
    <div
      className={`flex px-1 mb-4 cursor-pointer ${
        meChat && "flex-row-reverse"
      }`}
    >
      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-1">
        <img
          src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div
        className={`flex max-w-52 ${
          meChat ? "bg-indigo-500 text-white" : "bg-white text-gray-700"
        } rounded-3xl px-3 py-2 gap-3`}
      >
        <p>{data.message}</p>
      </div>
    </div>
  );
};

export default Message;
