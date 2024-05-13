import { useEffect, useState } from "react";
import useGetMyPost from "../zustand/useGetMyPost";
import axios from "axios";

const hostApi = import.meta.env.VITE_API_URL;

const useGetPost = () => {
  const [loading, setLoading] = useState(false);
  const { posts, setPosts } = useGetMyPost();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/post/getposts/user`, {
          withCredentials: true,
        });
        const data = await res.data;
        // console.log(data);
        setPosts(data.post);
        if (data.error) {
          throw new Error(data.error);
        }
        // setConversations(data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { posts, loading };
};
export default useGetPost;
