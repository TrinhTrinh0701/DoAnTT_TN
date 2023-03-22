import React, { useEffect } from "react";
import { useParams, useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../store/actions";
import { SliderCustom, Map, BoxInfo, RelatedPost } from "../../components";
import { path } from "../../ultils/constant";
import icons from "../../ultils/icons";

import { underMap } from "../../ultils/constant";

const { HiLocationMarker, TbReportMoney, RiCrop2Line, BsStopwatch, BsHash } =
  icons;

const DetailPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const navigate = useNavigate();

  const handleFilterLabel = () => {
    const titleSearch = `Tìm kiếm tin đăng theo chuyên mục ${posts[0]?.labelData?.value}`;
    navigate(
      {
        pathname: `/${path.SEARCH}`,
        search: createSearchParams({
          labelCode: posts[0]?.labelData?.code,
        }).toString(),
      },
      { state: { titleSearch } }
    );
  };

  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }));
  }, [postId]);

  return (
    <div className="flex w-full gap-4">
      <div className="w-[70%] ">
        <SliderCustom
          images={
            posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)
          }
        ></SliderCustom>
        <div className="p-4 bg-white rounded-md shadow-md">
          <div className="flex flex-col gap-2 ">
            <h2 className=" text-xl font-bold text-[#E13427]">
              {posts[0]?.title}
            </h2>
            <div className="flex items-center gap-2">
              <span>Chuyên mục:</span>
              <span
                onClick={handleFilterLabel}
                className="font-semibold underline cursor-pointer text-secondary2 hover:text-secondary1"
              >
                {posts[0]?.labelData?.value}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <HiLocationMarker color="#581C87"></HiLocationMarker>
              <span>{posts[0]?.address}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <TbReportMoney></TbReportMoney>
                <span className="text-xl font-semibold text-[#16C784]">
                  {posts[0]?.attributes?.price}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <RiCrop2Line></RiCrop2Line>
                <span>{posts[0]?.attributes?.acreage}</span>
              </span>
              <span className="flex items-center gap-1">
                <BsStopwatch></BsStopwatch>
                <span>{posts[0]?.attributes?.published}</span>
              </span>
              <span className="flex items-center gap-1">
                <BsHash></BsHash>
                <span>{posts[0]?.attributes?.hashtag}</span>
              </span>
            </div>
          </div>

          <div className="mt-8 ">
            <h3 className="my-4 text-xl font-semibold">Thông tin mô tả</h3>
            <div className="flex flex-col gap-3">
              {posts[0]?.description &&
                JSON.parse(posts[0]?.description)?.map((item, index) => {
                  return <span key={index}>{item}</span>;
                })}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="my-4 text-xl font-semibold">Đặc điểm tin đăng</h3>
            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full ">
                  <td className="p-2">Mã tin:</td>
                  <td className="p-2 ">{posts[0]?.overviews?.code}</td>
                </tr>
                <tr className="w-full bg-gray600">
                  <td className="p-2">Khu vực:</td>
                  <td className="p-2">{posts[0]?.overviews?.area}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-2">Loại tin rao:</td>
                  <td className="p-2">{posts[0]?.overviews?.type}</td>
                </tr>
                <tr className="w-full bg-gray600">
                  <td className="p-2">Đối tượng:</td>
                  <td className="p-2">{posts[0]?.overviews?.target}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-2">Gói tin:</td>
                  <td className="p-2">{posts[0]?.overviews?.bonus}</td>
                </tr>
                <tr className="w-full bg-gray600">
                  <td className="p-2">Ngày đăng:</td>
                  <td className="p-2">{posts[0]?.overviews?.created}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-2">Ngày hết hạn:</td>
                  <td className="p-2">{posts[0]?.overviews?.expired}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <h3 className="my-4 text-xl font-semibold">Thông tin liên hệ</h3>
            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full ">
                  <td className="p-2">Liên hệ:</td>
                  <td className="p-2 ">{posts[0]?.user?.name}</td>
                </tr>
                <tr className="w-full bg-gray600">
                  <td className="p-2">Điện thoại:</td>
                  <td className="p-2">{posts[0]?.user?.phone}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-2">Zalo:</td>
                  <td className="p-2">
                    {posts[0]?.user?.zalo || posts[0]?.user?.phone}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {posts && (
            <div className="mt-8">
              <h3 className="my-4 text-xl font-semibold">Bản đồ</h3>
              <Map address={posts[0]?.address}></Map>
              <span className="py-4 text-sm text-justify text-gray">
                {underMap[0]}
              </span>
              <span className="py-4 text-base italic text-justify text-gray">
                {`${posts[0]?.title} - Mã tin: ${posts[0]?.attributes?.hashtag}`}
              </span>
              <span className="py-4 text-sm text-justify text-gray">
                {underMap[1]}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="w-[30%] flex flex-col gap-8">
        <BoxInfo userData={posts[0]?.user}></BoxInfo>
        <RelatedPost></RelatedPost>
        <RelatedPost newPost></RelatedPost>
      </div>
    </div>
  );
};

export default DetailPost;
