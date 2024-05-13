import React from "react";
import useGetPost from "../hooks/useGetPost";
import Post from "../components/Post";
import { useAuthContext } from "../context/AuthContext";
import useGetNofications from "../hooks/useGetNofications";

const MyPost = () => {
  const { posts, loading } = useGetPost();
  const { authUser } = useAuthContext();

  const name = posts.map((post) => post.userId);
  // console.log(name);

  return (
    <>
      <div className="flex-1 h-screen overflow-hidden bg-[#f0f2f5] dark:bg-dark-3">
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
                  <Post postData={post} currentUser={authUser} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MyPost;
