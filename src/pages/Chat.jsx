import { useDispatch } from "react-redux";
import { useAuthContext } from "../context/AuthContext";
import { getMessage, sendNewMessage } from "../redux/messageSlice";
import { useEffect, useState } from "react";
import Message from "../components/Message";
import { useReducer } from "react";
import { useRef } from "react";
import useGetMessages from "../hooks/useGetMessages";
import useGetConversations from "../hooks/useGetConversations";
import NameCard from "../components/NameCard";
import useSendMessage from "../hooks/useSendMessage";
import ChatBar from "../components/ChatBar";

const Chat = () => {
  const { loadings, conversations } = useGetConversations();

  const { messages, waiting } = useGetMessages();
  // console.log(messages);

  const { sendMessage, loading } = useSendMessage();
  const [message, setMessage] = useState("");

  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const chat = { message: message };
    await sendMessage(chat);
  };
  return (
    <>
      <div className=" w-[300px] border-y-2 bg-white">
        <div className="w-full font-bold text-black my-8 mx-2 text-2xl">
          Messages
        </div>
        <div className=" mx-3 border-2 h-10 flex rounded-md">
          <img src="assets/icons/find.svg" className="w-7 m-2" alt="" />
          <input type="text" className="bg-transparent outline-none " />
        </div>
        <div className="mx-2">
          {conversations.map((conversation) => (
            <ChatBar key={conversation._id} data={conversation} />
          ))}
          {loadings ? <img src="assets/icons/loader.svg" /> : null}
        </div>
      </div>
      <div className="flex-1 h-screen">
        <div className=" flex-col justify-between h-full">
          <div className="bg-white flex items-center px-2 text-gray-700 h-[70px]">
            <h1 className="text-2xl font-semibold">Alice</h1>
          </div>
          <div className="overflow-scroll mt-2 h-[580px] bg-opacity-25 bg-gradient-to-r from-[#877eff] to-[#e879de] ">
            {messages.map((message) => (
              <div key={message._id}>
                <Message data={message} />
              </div>
            ))}
            <div ref={lastMessageRef} />
          </div>
          <div className=" border-t w-full h-[70px] bg-white flex items-center">
            <img className="w-8 mx-2" src="assets/icons/emoji.svg" alt="" />
            <img className="w-10 mx-2" src="assets/icons/attach.svg" alt="" />
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-9 p-2 rounded-full border border-gray-400 focus:outline-none focus:border-blue-500 text-black"
            />
            <button className=" text-white px-1 ml-2" onClick={handleSend}>
              {loading ? (
                <img className="w-9" src={"assets/icons/loader.svg"} alt="" />
              ) : (
                <img className="w-9" src={"assets/icons/send.svg"} alt="" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
