import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useReadNofications = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const markAsReadAll = async () => {
    // console.log(message);
    setLoading(true);
    try {
      const res = await axios.post(`/api/nofication/seenall`, {
        withCredentials: true,
      });
      console.log(res);
      const data = await res.data;
      if (data.error) throw new Error(data.error);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { markAsReadAll, loading };
};
export default useReadNofications;
