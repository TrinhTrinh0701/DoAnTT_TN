import React, { memo } from "react";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SliderCustom = ({ images }) => {
  return (
    <div className="w-full ">
      <Slider {...settings}>
        {images?.length > 0 &&
          images?.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-back flex px-12 justify-center h-[320px]"
              >
                <img
                  src={item}
                  alt="slider"
                  className="object-contain h-full m-auto"
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default memo(SliderCustom);
