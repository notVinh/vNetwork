import axios from "axios";
import { useEffect, useState } from "react";
import useSearch from "../zustand/useSearch";

const hostApi = import.meta.env.VITE_API_URL;

const useDebounc = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const { searchText } = useSearch();

  useEffect(() => {
    setLoading(true);
    const getData = setTimeout(() => {
      axios.get(`api/user/search?name=${searchText}`).then((response) => {
        // console.log(response.data);
        setLoading(false);
        setResult(response.data);
      });
    }, 500);

    return () => clearTimeout(getData);
  }, [searchText]);

  return { loading, result };
};
export default useDebounc;
