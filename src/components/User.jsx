import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import anonAvatar from "../assets/anon-avatar.png";
import { blobToBase64 } from "../ultils/Common/tobase64";

const User = () => {
  const { currentData } = useSelector((state) => state.user);

  return (
    <Fragment>
      {currentData && Object.keys(currentData).length > 0 && (
        <div className="flex items-center gap-2">
          <img
            src={blobToBase64(currentData?.avatar) || anonAvatar}
            alt="avatar"
            className="object-cover w-10 h-10 border-2 border-white rounded-full shadow-md"
          />
          <div className="flex flex-col">
            <span>
              Xin chào,{" "}
              <span className="font-semibold">{currentData?.name}</span>
            </span>
            <span>
              Mã tài khoản:{" "}
              <span className="font-medium">
                {`${currentData?.id?.match(/\d/g).join("")?.slice(0, 6)}`}
              </span>
            </span>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default User;
