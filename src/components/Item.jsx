import React, { memo, useState } from "react";
import icons from "../ultils/icons";
import { useNavigate, Link } from "react-router-dom";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";
import { path } from "../ultils/constant";

const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons;

const Item = ({
  images,
  user,
  title,
  star,
  description,
  attributes,
  address,
  id,
}) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);
  const navigate = useNavigate();

  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++)
      stars.push(<GrStar className="star-item" size={18} color="yellow" />);
    return stars;
  };

  return (
    <div className="flex w-full py-4 border-t border-orangce">
      <Link
        to={`${path.DETALIL}${formatVietnameseToString(
          title?.replaceAll("/", "")
        )}/${id}`}
        className="w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer"
      >
        {images.length > 0 &&
          images
            .filter((i, index) => [...Array(4).keys()].some((i) => i === index))
            ?.map((i, index) => {
              return (
                <img
                  key={index}
                  src={i}
                  alt="preview"
                  className="w-[47%] h-[120px] object-cover"
                />
              );
            })}
        <span className="absolute px-2 text-white rounded-md bg-overlay-70 left-1 bottom-4">{`${images.length} ảnh`}</span>
        <span
          className="absolute text-white right-5 bottom-1"
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => setIsHoverHeart(false)}
        >
          {isHoverHeart ? (
            <RiHeartFill size={26} color="red" />
          ) : (
            <RiHeartLine size={26} />
          )}
        </span>
      </Link>
      <div className="w-3/5">
        <div className="flex justify-between w-full gap-4">
          <Link
            to={`${path.DETALIL}${formatVietnameseToString(
              title?.replaceAll("/", "")
            )}/${id}`}
            className="font-medium text-red"
          >
            {handleStar(+star).length > 0 &&
              handleStar(+star).map((star, number) => {
                return <span key={number}>{star}</span>;
              })}
            {title}
          </Link>
          <div className="w-[10%] flex justify-end">
            <BsBookmarkStarFill size={24} color="orange" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 my-2">
          <span className="overflow-hidden font-bold flex-2 text-green whitespace-nowrap text-ellipsis">
            {attributes?.price}
          </span>
          <span className="flex-1">{attributes?.acreage}</span>
          <span className="overflow-hidden flex-3 whitespace-nowrap text-ellipsis">
            {`${address.split(",")[address.split(",").length - 2]}${
              address.split(",")[address.split(",").length - 1]
            }`}
          </span>
        </div>
        <p className="text-gray w-full h-[50px] text-ellipsis overflow-hidden">
          {description}
        </p>
        <div className="flex items-center justify-between my-5">
          <div className="flex items-center ">
            <img
              src="https://lnsel.com/wp-content/uploads/2018/12/anon-avatar-300x300.png"
              alt="avatar"
              className="w-[30px] h-[30px] object-cover rounded-full"
            />
            <p>{user?.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <a
              href="tel:0909416601"
              className="p-1 text-center text-white rounded-md bg-secondary2"
              target="_blank"
            >
              {`Gọi ${user?.phone}`}
            </a>
            <a
              href={`https://zalo.me/${user?.phone}`}
              className="px-1 text-center border rounded-md text-secondary2 border-secondary2"
              target="_blank"
            >
              Nhắn zalo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
