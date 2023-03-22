import React, { useState, useEffect } from "react";
import { ItemSidebar, RelatedPost } from "../../components";
import { List, Pagination } from "./index";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const SearchDetail = () => {
  const location = useLocation();
  const { prices, areas } = useSelector((state) => state.app);

  return (
    <div className="flex flex-col w-full gap-3">
      <div>
        <h1 className="text-[28px] font-bold">
          {location.state?.titleSearch || "Kết quả tìm kiếm"}
        </h1>
        <p className="text-base text-gray-700">{`${
          location.state?.titleSearch || ""
        } phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}</p>
      </div>
      <div className="flex w-full gap-4">
        <div className="w-[70%]">
          <List />
          <Pagination />
        </div>
        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar
            isDouble={true}
            type="priceCode"
            content={prices}
            title="Xem theo giá"
          />
          <ItemSidebar
            isDouble={true}
            type="areaCode"
            content={areas}
            title="Xem theo diện tích"
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default SearchDetail;
