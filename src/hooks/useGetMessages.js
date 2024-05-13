import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const hostApi = import.meta.env.VITE_API_URL;

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/message/${selectedConversation._id}`,
          {
            withCredentials: true,
          }
        );
        const data = await res.data;

        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
