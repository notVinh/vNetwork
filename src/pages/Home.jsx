import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import NameCard from "../components/NameCard";
import { useDispatch } from "react-redux";
import { getPost } from "../redux/postSlice";

const getCurrentUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

const Home = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      await dispatch(getPost()).then((result) => {
        setPosts(result.payload.posts);
      });
    };
    fetchPost();
  }, []);

  return (
    <section className="flex-1 h-screen overflow-hidden bg-[#f0f2f5] dark:bg-dark-3">
      <Header />
      <section className="flex justify-between w-full ">
        <div className="flex justify-center w-full">
          <div className="h-screen overflow-scroll pb-14 ">
            {posts.map((post) => (
              <div key={post._id}>
                <Post postData={post} currentUser={currentUser} />
              </div>
            ))}
          </div>
        </div>
        <div className="text-text-light-1 dark:test-text-dark-1 bg-light-1 dark:bg-dark-2 border-2 dark:border-dark-5 m-3 p-3 rounded-xl">
          <div>
            <h1>Message</h1>
            <NameCard />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
