import React, { useEffect, useState } from "react";
import ImagePost from "./ImagePost";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";
import { multiFormatDateString } from "../utils";
import PostAction from "./PostAction";

const Post = ({ postData, currentUser }) => {
  const [author, setAuthor] = useState(postData.userId);
  const [authorData, setAuthorData] = useState("");
  const [subImg, setSubImg] = useState(postData?.image.slice(1));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(author)).then((result) => {
      setAuthorData(result.payload);
    });
  }, [author]);

  return (
    <div className="xl:w-[800px] w-[450px] flex justify-center border-2 my-3 rounded-xl border-light-2 shadow-md dark:border-dark-5 bg-light-1 dark:bg-dark-2">
      <div className="text-text-dark-1 flex p-5 w-full">
        <div className="w-full flex justify-between">
          <div className="relative">
            <img
              src={authorData?.profilePicture}
              alt=""
              className="w-10 h-10 rounded-full my-1 mr-3 "
            />
            {/* <span className="absolute top-0 bg-black h-full">Vinh</span> */}
          </div>
          <div className="flex-1 w-full">
            <div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-text-light-1 font-semibold dark:text-text-dark-1">
                    {authorData?.name}
                  </div>
                  <div className="text-text-light-2 mx-1 text-sm">
                    @{authorData?.username}
                  </div>
                </div>
                <div className="text-text-light-2 text-sm">
                  {multiFormatDateString(postData.createdAt)}
                </div>
              </div>
              <div className="relative">
                <div
                  className="text-text-light-1 dark:text-text-dark-1"
                  dangerouslySetInnerHTML={{
                    __html: postData && postData.content,
                  }}
                ></div>

                <div className="w-full flex gap-3 mt-7">
                  <img
                    src={postData?.image[0]}
                    alt=""
                    className={`w-[240px] h-[240px] rounded-md object-cover border border-light-2 dark:border-dark-5 p-2 xl:hidden`}
                  />

                  <div className="flex flex-col xl:flex-row flex-wrap">
                    <img
                      src={postData?.image[0]}
                      alt=""
                      className={`w-[240px] h-[240px] rounded-md object-cover border border-light-2 dark:border-dark-5 p-2 hidden xl:block`}
                    />
                    {subImg.map((img) => (
                      <div key={img}>
                        <ImagePost img={img} />
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div className="absolute border-l-2 rounded-sm border-dark-5 h-[calc(100%)] top-[52px] left-[-40px] w-8">
                  <div className="absolute bottom-[-20px] right-[-50px] w-10 h-10 ">
                    <Comment />
                  </div>
                </div> */}
              </div>
              <div className="flex justify-end mt-7">
                <PostAction
                  postData={postData}
                  postId={postData?._id}
                  authorId={authorData._id}
                  currentUserId={currentUser?._id}
                  isLiked={postData.likes.includes(
                    currentUser && currentUser?._id
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Post);
