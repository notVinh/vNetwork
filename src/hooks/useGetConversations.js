import { useEffect, useState } from "react";

const hostApi = import.meta.env.VITE_API_URL;

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${hostApi}/api/user`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
