import React from "react";

const ImagePost = ({ img, full }) => {
  const vinh = img;
  return (
    <img
      src={vinh}
      alt=""
      className={` w-[80px] h-[80px] xl:w-[240px] xl:h-[240px] rounded-md object-cover border border-light-2 dark:border-dark-5 p-2`}
    />
  );
};

export default ImagePost;
