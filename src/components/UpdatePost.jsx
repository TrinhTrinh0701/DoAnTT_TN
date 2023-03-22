import React from "react";
import { CreatePost } from "../containers/System";

const UpdatePost = ({ setIsEdit }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsEdit(false);
      }}
      className="absolute top-0 bottom-0 left-0 right-0 flex justify-center bg-overlay-70"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-full overflow-y-auto bg-white max-w-1100"
      >
        <CreatePost isEdit></CreatePost>
      </div>
    </div>
  );
};

export default UpdatePost;
