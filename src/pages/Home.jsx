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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (posts.length === 0) {
      setTimeout(() => {
        setError(true);
      }, 10000);
    }
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
      {/* <div className="xl:hidden flex justify-between w-screen px-5 py-2">
        <img src={currentUser?.profilePicture} alt="" className="w-10" />
        <div className="border-2 flex rounded-full flex-1 ml-5">
          <input
            type="text"
            className="mx-5 outline-none bg:tranparent dark:bg-transparent  "
            placeholder="What do you think ?"
          />
        </div>
      </div> */}
      <section className="flex justify-between w-full ">
        <div className="flex justify-center w-full">
          <div className="h-screen overflow-scroll pb-14 w-full flex flex-col items-center">
            {loading && (
              <>
                <div
                  className={`${
                    error ? "block" : "hidden"
                  } text-text-light-2 mt-5 `}
                >
                  My API is uploaded to a free server, your request may be
                  delayed for about 30 seconds. Please wait.
                </div>
                <div className="flex w-full justify-center my-3">
                  <img
                    src="assets/icons/loading.svg"
                    className="w-10 rounded-full bg-white"
                  />
                </div>
              </>
            )}
            {posts.map((post) => (
              <div key={post._id} className="flex justify-center">
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
