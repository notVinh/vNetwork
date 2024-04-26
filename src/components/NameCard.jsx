import React from "react";

const NameCard = () => {
  return (
    <div className="flex text-text-light-2 dark:text-text-dark-1 border-2 dark:border-dark-5 rounded-full px-1 py-0 items-center justify-start min-w-[14rem] bg-light-1 dark:bg-dark-3 min-h-[44px]">
      <div className="flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dshvydi5f/image/upload/v1709050096/vShop/images/womansplash_j6ahxo.png"
          alt=""
          className="w-[30px] h-[30px] rounded-full m-[5px]"
        />
      </div>
      <div className="h-5 w-[1px] border mx-2 border-light-3 dark:border-gray-600"></div>
      <div className="text-center flex-1 ">Đặng Quang Vinh</div>
    </div>
  );
};

export default NameCard;
