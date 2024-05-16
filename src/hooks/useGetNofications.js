import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import useGetMyPost from "../zustand/useGetMyPost";
import { useAuthContext } from "../context/AuthContext";
import useNofications from "../zustand/useNofications";

const hostApi = import.meta.env.VITE_API_URL;

const useGetNofications = () => {
  const [loading, setLoading] = useState(false);
  const { nofications, setNofication } = useNofications();

  const { authUser } = useAuthContext();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/nofication/get`, {
          withCredentials: true,
        });
        const data = await res.data;
        // console.log(data);

        if (data.error) throw new Error(data.error);
        setNofication(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
    // if (selectedConversation?._id) getMessages();
  }, []);

  return { nofications, loading };
};
export default useGetNofications;
