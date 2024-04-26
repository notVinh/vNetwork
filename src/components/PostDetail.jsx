import React, { useEffect, useMemo, useReducer, useState } from "react";
import ImagePost from "./ImagePost";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { createNewComment, getPostComment } from "../redux/commentSlice";
import { toast } from "react-toastify";

const getCurrentUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

const PostDetail = ({
  data,
  openModal,
  closeModal,
  likedNumber,
  commentNumber,
}) => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  const [comment, setComment] = useState("");
  const [toggleComment, setToggleComment] = useState(true);
  const [showComment, setShowComment] = useState(true);

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [commentList, setCommentList] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  const [loading, setLoading] = useState(false);

  const liked = true;
  const handleLikePost = () => {};

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetch(`/api/comment/getpostcomments/${data._id}`);
  //     console.log("render comment");
  //     const jsonResult = await result.json();

  //     console.log(jsonResult);
  //     setCommentList(jsonResult);
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchComments = async () => {
      await dispatch(getPostComment(data._id)).then((result) => {
        setCommentList(result.payload);
        setCommentCount(result.payload.length);
        commentNumber(result.payload.length);
        setLoading(false);
      });
    };
    fetchComments();
  }, [ignored]);

  const handleComment = async () => {
    if (comment !== "") {
      setLoading(true);
      const commentCredentials = {
        content: comment,
        postId: data._id,
        userId: currentUser._id,
      };
      await dispatch(createNewComment(commentCredentials)).then((result) => {
        forceUpdate();
        setComment("");
      });
    } else {
      toast.error("Type something");
    }
  };

  // console.log(commentList);

  return (
    <>
      <div
        className={`bg-black bg-opacity-30 fixed z-50 top-0 right-0 bottom-0 left-0 w-full h-full m-auto flex justify-center items-center ${
          !openModal && "hidden"
        }`}
        onClick={closeModal}
      ></div>
      <div
        className={`bg-light-1 dark:bg-dark-3 border-8 text-text-light-1 dark:text-text-dark-1 dark:border-dark-5 w-[700px] h-[700px] flex rounded-xl justify-between fixed z-50 -50 top-0 right-0 bottom-0 left-0 m-auto ${
          !openModal && "hidden"
        }`}
      >
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex justify-center h-12 w-full mb-4 border-b-2 dark:border-dark-5">
            <div className="flex items-center font-bold">Vinh Post</div>
          </div>
          <div className=" flex-1 overflow-scroll mx-3 ">
            <div
              className="text-text-light-1 dark:text-text-dark-2 mx-1"
              dangerouslySetInnerHTML={{
                __html: data && data.content,
              }}
            ></div>

            <div className="w-full flex gap-3 mt-7 flex-wrap">
              {data?.image.map((img) => (
                <ImagePost key={img} img={img} full={true} />
              ))}
            </div>
          </div>
          <div className="border-t-2 dark:border-dark-5">
            <div className="flex justify-between m-2">
              <div className="flex ml-5">
                {" "}
                <div className="flex items-center justify-center cursor-pointer hover:scale-110">
                  <img
                    src={
                      liked
                        ? "/assets/icons/liked.svg"
                        : "/assets/icons/like.svg"
                    }
                    className="w-[20px]"
                    onClick={handleLikePost}
                  />
                </div>
                <span className="ml-2 cursor-default">{likedNumber}</span>
              </div>
              <div className="flex w-[12rem] justify-evenly">
                <div className="flex">
                  <span className="mr-2">{commentCount}</span>{" "}
                  <img src="/assets/icons/chat.svg" className="w-[20px]" />
                </div>
                <div className="flex">
                  <span className="mr-2">3</span>{" "}
                  <img src="/assets/icons/repost.svg" className="w-[20px]" />
                </div>
                <div className="flex">
                  <span className="mr-2">3</span>{" "}
                  <img src="/assets/icons/share.svg" className="w-[20px]" />
                </div>
              </div>
            </div>
            <div className="">
              <span
                className="font-thin flex flex-col justify-center items-center cursor-pointer "
                onClick={() => {
                  setShowComment(!showComment);
                  setToggleComment(!toggleComment);
                }}
              >
                {toggleComment ? (
                  <>
                    <img src="assets/icons/down.svg" alt="" className="w-5" />
                    Hide comment
                  </>
                ) : (
                  <>
                    <img src="assets/icons/up.svg" alt="" className="w-5" />
                    Show comment
                  </>
                )}
              </span>
            </div>
            <div
              className={`h-80 overflow-scroll ${
                showComment ? "block" : "hidden"
              }`}
            >
              {commentList?.map((comment) => (
                <Comment
                  key={comment._id}
                  data={comment}
                  isLiked={comment.likes.includes(
                    currentUser && currentUser?._id
                  )}
                  rerenderLoad={(item) => {
                    if (item === true) {
                      forceUpdate();
                    }
                  }}
                />
              ))}
            </div>

            <div className="h-10 w-full mt-4 flex px-2 my-3">
              <img
                src={currentUser?.profilePicture}
                alt="avatar"
                className="rounded-full h-8 w-8 mr-2 mt-1"
              />
              <textarea
                className="text-black bg-light-2 rounded-2xl flex-1 w-full h-10 outline-none py-2 px-3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={handleComment}>
                {loading ? "Sending" : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PostDetail);
