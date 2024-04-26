import React from "react";

const ImagePost = ({ img, full }) => {
  const vinh = img;
  return (
    <img
      src={vinh}
      alt=""
      className={`${
        full ? `w-full` : `w-[220px] h-[220px]`
      }  rounded-md object-cover border border-light-2 dark:border-dark-5 p-2`}
    />
  );
};

export default ImagePost;
