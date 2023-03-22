import React, { useEffect, useState } from "react";
import { Sitem } from "./index";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const RelatedPost = ({ newPost }) => {
  const { newPosts, outStandingPost } = useSelector((state) => state.post);
  const [posts, setPosts] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    newPost
      ? dispatch(actions.getNewPosts())
      : dispatch(actions.getOutStandingPost());
  }, []);

  useEffect(() => {
    newPost ? setPosts(newPosts) : setPosts(outStandingPost);
  }, [outStandingPost, newPosts]);

  return (
    <div className="w-full p-4 bg-white rounded-md">
      <h3 className="mb-4 text-lg font-semibold">
        {newPost ? "Tin mới đăng" : "Tin nổi bật"}
      </h3>
      <div className="flex flex-col w-full gap-2">
        {/* {posts?.map((item) => {
          return (
            <Sitem
              key={item.id}
              title={item.title}
              price={item?.attributes?.price}
              createdAt={item.createdAt}
              image={JSON.parse(item.images.image)}
              star={item.star}
            />
          );
        })} */}
      </div>
    </div>
  );
};

export default RelatedPost;
