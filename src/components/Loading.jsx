import React, { Fragment } from "react";
import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    <Fragment>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e30f1d", "#f0e214", "#ee7d0b", "#14d96d", "#e412ef"]}
      ></ColorRing>
      <h1 className="text-lg text-gray">Đang tải ảnh vui lòng đợi.....</h1>
    </Fragment>
  );
};

export default Loading;
