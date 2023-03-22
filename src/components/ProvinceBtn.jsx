import React, { memo } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { path } from "../ultils/constant";

const ProvinceBtn = ({ name, image, provinceCode }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    const titleSearch = `Cho thuê ${name}, Phòng trọ giá rẻ, Mới nhất 2023`;
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams({ provinceCode }).toString(),
      },
      { state: { titleSearch } }
    );
  };
  return (
    <div
      onClick={handleOnClick}
      className="text-blue-700 shadow-md cursor-pointer rounded-bl-md rounded-br-md hover:text-orangce"
    >
      <img
        src={image}
        alt={name}
        className="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md"
      />
      <div className="p-2 font-medium text-center">{name}</div>
    </div>
  );
};

export default memo(ProvinceBtn);
