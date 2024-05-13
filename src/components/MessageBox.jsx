import React, { useEffect, useRef, useState } from "react";
import useGetMessages from "../hooks/useGetMessages";
import useSendMessage from "../hooks/useSendMessage";
import Message from "./Message";
import toggleMessageBox from "../zustand/toggleMessageBox";
import LoadingDot from "./LoadingDot";

const MessageBox = () => {
  const { messages, loading: waiting } = useGetMessages();
  //   console.log(messages);

  const { sendMessage, loading } = useSendMessage();
  const [message, setMessage] = useState("");

  const lastMessageRef = useRef(null);

  const { isOpen, toggle, recieverInfo, loadingDot, setLoadingDot } =
    toggleMessageBox();
  // console.log(recieverInfo);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    const chat = { message: message };
    await sendMessage(chat);
  };
  return (
    <>
      <div
        className={`${isOpen ? "fixed" : "hidden"} bottom-0 right-0 bg-white`}
      >
        <div className="w-[320px] h-[450px]">
          <div className="bg-white flex items-center px-2 text-gray-700 h-[50px] justify-between">
            <h1 className="text-2xl font-semibold">{recieverInfo.name}</h1>
            <button onClick={() => toggle(false)}>
              <img
                src="assets/icons/close1.svg"
                alt=""
                className="w-8 bg-slate-200 rounded-full p-2"
              />
            </button>
          </div>
          <div className="flex-1 h-[350px] overflow-scroll mt-2 mx-1">
            {waiting && (
              <div className="flex w-full justify-center my-3">
                <img src="assets/icons/loading.svg" className="w-8 bg-white" />
              </div>
            )}

            {messages.map((message) => (
              <div key={message._id}>
                <Message data={message} />
              </div>
            ))}
            <div ref={lastMessageRef} />
            {/* {loadingDot && <LoadingDot />} */}
          </div>
          <div className=" border-tw-full h-[50px]">
            <div className="flex items-center justify-center">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                // onFocus={() => setLoadingDot(true)}
                // onBlur={() => setLoadingDot(false)}
                className="w-full h-9 p-2 rounded-full border border-gray-400 focus:outline-none focus:border-blue-500 text-black"
              />
              <button className=" text-white px-1 ml-2" onClick={handleSend}>
                {loading ? (
                  <img className="w-7" src="assets/icons/loader.svg" alt="" />
                ) : (
                  <img className="w-9" src="assets/icons/send.svg" alt="" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageBox;
