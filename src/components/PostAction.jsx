import React, { useEffect, useReducer, useState } from "react";
import PostDetail from "./PostDetail";
import { useDispatch } from "react-redux";
import { likePost } from "../redux/postSlice";
import { getPostComment } from "../redux/commentSlice";
import PostMenu from "./PostMenu";

const PostAction = ({ postData, postId, currentUserId, isLiked }) => {
  const [openPostDetail, setOpenPostDetail] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const [likedNumber, setLikedNumber] = useState(postData.likesCount);
  const [commentNumber, setCommentNumber] = useState(0);

  // console.log(currentUserId, postId, isLiked);

  const dispatch = useDispatch();

  const handleLikePost = () => {
    const postCredentials = {
      postId: postId,
      user: { userId: currentUserId },
    };
    // console.log(postCredentials);
    dispatch(likePost(postCredentials));
    if (liked) {
      setLiked(!liked);
      setLikedNumber(likedNumber - 1);
    } else {
      setLiked(!liked);
      setLikedNumber(likedNumber + 1);
    }
  };

  return (
    <div className="flex border-2 dark:border-dark-5 rounded-full px-1 py-0 items-center justify-center w-[14rem] text-text-light-2 dark:bg-dark-3 min-h-[44px] mx-1">
      <div className="mx-2 flex">
        <div className="flex items-center justify-center cursor-pointer hover:scale-110">
          <img
            src={
              liked ? "/assets/icons/heart1.svg" : "/assets/icons/hearted2.svg"
            }
            className="w-[20px]"
            onClick={handleLikePost}
          />
        </div>
        <span className="ml-2 cursor-default">{likedNumber}</span>
      </div>
      <div className="mx-2 flex">
        <div className="flex items-center justify-center cursor-pointer hover:scale-110">
          <img
            src="/assets/icons/chat.svg"
            className="w-[18px]"
            onClick={() => setOpenPostDetail(true)}
          />
        </div>
        <span className="ml-2 cursor-default">{commentNumber}</span>
      </div>
      <div className="mx-2 flex">
        <div className="flex items-center justify-center cursor-pointer hover:scale-110">
          <img src="/assets/icons/share.svg" className="w-[20px]" />
        </div>
        <span className="ml-2 cursor-default">1</span>
      </div>
      <div className="mx-2 flex">
        <div className="flex items-center justify-center cursor-pointer hover:scale-110">
          <PostMenu postId={postId} />
        </div>
      </div>

      <PostDetail
        data={postData}
        openModal={openPostDetail}
        closeModal={() => {
          setOpenPostDetail(!openPostDetail);
        }}
        likedNumber={likedNumber}
        commentNumber={(item) => setCommentNumber(item)}
      />
    </div>
  );
};

export default PostAction;
