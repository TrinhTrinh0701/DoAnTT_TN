import React, { memo } from "react";
import { text } from "../ultils/dataIntro";
import icons from "../ultils/icons";
import { Button } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";

const { GrStar } = icons;
const star = [1, 2, 3, 4, 5];

const Intro = () => {
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="flex flex-col items-center justify-center w-3/5 gap-4 p-4 bg-white rounded-md shadow-md">
      <h3 className="text-lg font-bold">{text.title}</h3>
      <p className="my-4 text-center text-gray900">
        {text.description}
        <span className="text-link">
          {categories?.length > 0 &&
            categories.map((item) => {
              return (
                <Link
                  to={`/${formatVietnameseToString(item.value)}`}
                  key={item.code}
                  className="font-medium text-secondary2 hover:text-orangce"
                >
                  {`${item.value.toLowerCase()}, `}
                </Link>
              );
            })}
        </span>
        {text.description2}
      </p>
      <div className="flex items-center justify-around w-full">
        {text.statistic.map((item, index) => {
          return (
            <div
              className="flex flex-col items-center justify-center"
              key={index}
            >
              <h4 className="text-lg font-bold">{item.value}</h4>
              <p className="text-gray">{item.name}</p>
            </div>
          );
        })}
      </div>
      <h3 className="py-2 text-lg font-bold">{text.price}</h3>
      <div className="flex items-center justify-center gap-1">
        {star.map((item) => {
          return (
            <span key={item}>
              <GrStar size={24} color="yellow" />
            </span>
          );
        })}
      </div>
      <p className="italic text-center text-gray">{text.comment}</p>
      <span className="text-gray-700">{text.author}</span>
      <h3 className="py-2 text-lg font-bold">{text.question}</h3>
      <p>{text.answer}</p>
      <Button
        text="Đăng tin ngay"
        bgColor="bg-secondary2"
        textColor="text-white"
        px="px-6"
      />
      <div className="h-12"></div>
    </div>
  );
};

export default memo(Intro);
