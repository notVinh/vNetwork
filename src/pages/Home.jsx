import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import NameCard from "../components/NameCard";
import { useDispatch } from "react-redux";
import { getPost } from "../redux/postSlice";
import { useAuthContext } from "../context/AuthContext";
import MessageBar from "../components/MessageBar";
import MessageBox from "../components/MessageBox";
import toggleSidebar from "../zustand/toggleSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarItem } from "../utils";

const Home = () => {
  const { authUser } = useAuthContext();

  const [currentUser, setCurrentUser] = useState(authUser);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { isOpen, toggle } = toggleSidebar();

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
      <nav className={` ${isOpen && "min-w-[270px]"} justify-between `}>
        <div className="w-full flex justify-evenly px-5 xl:hidden ">
          {sidebarItem.map((item) => (
            <div
              className={` my-2 flex h-11 items-center rounded-lg px-2 cursor-pointer hover:bg-slate-400 ${
                location.pathname === item.url &&
                "bg-gradient-to-r  from-[#877eff] to-[#e879de] text-text-dark-1"
              }`}
              key={item.id}
              onClick={() => {
                setSelectedIndex(item.id);
                navigate(item.url);
              }}
            >
              <div className="text-light-2xl mx-1 ">
                <img
                  src={item.imgURL}
                  alt=""
                  className={`${
                    location.pathname === item.url &&
                    "invert brightness-0 transition"
                  } `}
                />
              </div>
              <div
                className={`text-text-light-2 mx-3 ${
                  isOpen ? "block" : "hidden"
                } ${
                  location.pathname === item.url &&
                  "invert brightness-0 transition"
                }`}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </nav>
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
