import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";
import { likeComment } from "../redux/commentSlice";
import CommentMenu from "./CommentMenu";
import { multiFormatDateStringAbb } from "../utils";

const getCurrentUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

const Comment = ({ data, isLiked, rerenderLoad }) => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [userId, setUserId] = useState(data.userId);
  const [userData, setUserData] = useState("");
  const [liked, setLiked] = useState(isLiked || false);
  const [likedNumber, setLikedNumber] = useState(data.likesCount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(userId)).then((result) => {
      setUserData(result.payload);
    });
  }, [userId]);

  const handleLikeComment = () => {
    const postCredentials = {
      commentId: data._id,
      user: { userId: currentUser._id },
    };
    // console.log(postCredentials);
    dispatch(likeComment(postCredentials));
    if (liked) {
      setLiked(!liked);
      setLikedNumber(likedNumber - 1);
    } else {
      setLiked(!liked);
      setLikedNumber(likedNumber + 1);
    }
  };

  // console.log(data);

  return (
    <div className="flex items-center w-full bg-white dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-2 antialiased flex max-w-lg group">
        <img
          className="rounded-full h-8 w-8 mr-2 mt-1 "
          src={
            userData?.profilePicture
              ? userData.profilePicture
              : "https://picsum.photos/id/1027/200/200"
          }
        />
        <div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
            <div className="font-semibold text-sm leading-relaxed">
              {userData?.name}
            </div>
            <div className="text-normal leading-snug md:leading-normal">
              {data.content}
            </div>
          </div>
          <div className="text-xs ml-4 mt-0.5 text-gray-500 dark:text-gray-400">
            <span className="mr-6">
              {multiFormatDateStringAbb(data.createdAt)}
            </span>
          </div>

          <div className="bg-white dark:bg-gray-700 border border-white dark:border-gray-700 rounded-full float-right -mt-8 mr-0.5 flex shadow items-center ">
            <div className="flex items-center justify-center cursor-pointer hover:scale-110">
              <img
                src={
                  liked
                    ? "/assets/icons/heart1.svg"
                    : "/assets/icons/hearted2.svg"
                }
                className="w-[20px]"
                onClick={handleLikeComment}
              />
            </div>

            <span className="text-sm ml-1 pr-1.5 text-gray-500 dark:text-gray-300 cursor-default">
              {likedNumber}
            </span>
          </div>
        </div>
        <div className="mt-5 mx-2 ">
          <CommentMenu
            commentId={data._id}
            rerender={(item) => {
              rerenderLoad(item);
              console.log(item);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
