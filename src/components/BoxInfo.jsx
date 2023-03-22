import React, { memo } from "react";
import anonAvatar from "../assets/anon-avatar.png";
import icons from "../ultils/icons";

const { BsDot, BsTelephoneFill, SiZalo } = icons;

const BoxInfo = ({ userData }) => {
  return (
    <div className="flex flex-col items-center w-full gap-4 p-4 rounded-md bg-secondary1">
      <img
        src={anonAvatar}
        alt="avatar"
        className="object-contain w-16 h-16 rounded-full"
      />
      <h3 className="text-xl font-medium">{userData?.name}</h3>
      <span className="flex items-center">
        <BsDot color="green" size={30}></BsDot>
        <span>Đang hoạt động</span>
      </span>
      <a
        className="bg-[#16C784] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg"
        href="tel:0909416601"
      >
        <BsTelephoneFill></BsTelephoneFill>
        {userData?.phone}
      </a>
      <a
        className="flex items-center justify-center w-full gap-2 py-2 text-base font-semibold bg-white rounded-md"
        href={`https://zalo.me/${userData?.phone}`}
      >
        <SiZalo size={30} color="blue"></SiZalo>
      </a>
    </div>
  );
};

export default memo(BoxInfo);
