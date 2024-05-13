import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import NameCard from "../components/NameCard";
import { useDispatch } from "react-redux";
import { getPost } from "../redux/postSlice";
import { useAuthContext } from "../context/AuthContext";
import MessageBar from "../components/MessageBar";
import MessageBox from "../components/MessageBox";

const Home = () => {
  const { authUser } = useAuthContext();

  const [currentUser, setCurrentUser] = useState(authUser);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      await dispatch(getPost()).then((result) => {
        setPosts(result.payload.posts);
        setLoading(false);
      });
    };
    fetchPost();
  }, []);

  return (
    <div className="flex-1 h-screen overflow-hidden bg-[#f0f2f5] dark:bg-dark-3">
      <Header />
      <section className="flex justify-between w-full ">
        <div className="flex justify-center w-full">
          <div className="h-screen overflow-scroll pb-14 w-full flex flex-col items-center">
            {loading && (
              <div className="flex w-full justify-center my-3">
                <img
                  src="assets/icons/loading.svg"
                  className="w-10 rounded-full bg-white"
                />
              </div>
            )}
            {posts.map((post) => (
              <div key={post._id}>
                <Post postData={post} currentUser={currentUser} />
              </div>
            ))}
          </div>
        </div>

        <MessageBar />
      </section>
      <MessageBox />
    </div>
  );
};

export default Home;
