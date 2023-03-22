import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { GrStar } from "react-icons/gr";
const Sitem = ({ title, price, image, createdAt, star }) => {
  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++)
      stars.push(<GrStar className="star-item" size={18} color="yellow" />);
    return stars;
  };
  return (
    <div className="flex items-center w-full gap-2 py-2 border-b border-gray">
      <img
        src={image[0]}
        alt=""
        className="w-[65px] h-[65px] object-cover flex flex-none rounded-md"
      />
      <div className="flex flex-col justify-between flex-auto w-full gap-1">
        <h4 className="text-back text-[14px]">
          {handleStar(+star).length > 0 &&
            handleStar(+star).map((star, number) => {
              return <span key={number}>{star}</span>;
            })}
          {`${title?.slice(0, 45)}...`}
        </h4>
        <div className="flex items-center justify-between w-full ">
          <span className="text-[12px] font-medium text-green">{price}</span>
          <span className="text-[10px] text-gray">{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(Sitem);
