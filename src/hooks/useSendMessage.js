import { useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    // console.log(message);
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        message,
        {
          withCredentials: true,
        }
      );
      const data = await res.data;
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
